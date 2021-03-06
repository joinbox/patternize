import { join, dirname, relative } from 'path';
import extractContentTypes from './extractContentTypes.mjs';
import clearMenu from './clearMenu.mjs';
import normalizeName from './normalizeName.mjs';
import getFamilyTree from './getFamilyTree.mjs';
import validateYAML from './validateYAML.mjs';
import parseYAML from './parseYAML.mjs';
import mergeProperties from './mergeProperties.mjs';
import Structure from './Structure.mjs';
import mapTree from './mapTree.mjs';
import mapObject from './mapObject.mjs';
import adjustPaths from './adjustPaths.mjs';
import adjustSources from './adjustSources.mjs';
import removeHiddenEntriesFromMenu from './removeHiddenEntriesFromMenu.mjs';

/**
 * Parses *main* pattern YAML file, gathers all necessary information and returns a structure that
 * can be used to generate the documentation for all patterns (one at a time).
 * Important: All source paths are absolute, all destination paths relative to the output directory
 * @param {object[]} originalStructure  Structure as provided in entry YAML file, but converted
 *                                      to objects with two properties: data (which is either
 *                                      the heading or a path to a md file) and children (recursive
 *                                      structure)
 * @param {object} masterConfig         YAML config provided in the entry YAML file; will serve as
 *                                      highest-most config that will be inherited by all children
 * @param {string} entryYAMLFilePath    Path to the entry YAML file
 * @param {function} readFile           Function that takes a path as an argument and returns the
 *                                      corresponding file's content. Needed for DI (testing).
 * @returns {array}                     Array in the form of:
 *                      [{
 *                          title: 'Name of the Pattern',
 *                          sourcePath: 'path/to/the/doc-file.md (relative to YAML file)',
 *                          destinationPath: 'path/the/result-will-be-written-to.html',
 *                          menu: [{
 *                              title: 'Title of Entry',
 *                              destination: 'path/to/file',
 *                              active: true,
 *                              children: [(nested entries of the same type)]
 *                          }]
 *                      }]
 */
export default ({
    structure,
    masterConfig,
    entryYAMLFilePath,
    readFile,
} = {}) => {

    const menuEntries = [];
    // Add masterConfig (at this time just the project's name) as root entry to structure
    const structureWithMaster = [{
        data: masterConfig.project,
        children: structure,
    }];

    new Structure(structureWithMaster)

        // Fetch YAML and MD from .md files (if the file exists)
        .map((item) => {

            // Try to read file; if it does not exist, return current item
            const filePath = join(dirname(entryYAMLFilePath), item.data);
            const content = readFile(filePath);
            // Only show a warning if path looks like a file (contains a file ending)
            if (!content) {
                if (/\.[a-z0-9]{2,4}$/i.test(filePath)) {
                    console.warn(`Entry '${item.data}' in entry YAML file's 'structure' property is not a valid file path. Treating it as a crossheading.`);
                }
                return item;
            }

            // Extract YAML and MD from file; validate YAML
            const { yaml, md } = extractContentTypes(content);
            const parsedYAML = parseYAML(yaml);
            if (!md || !validateYAML(parsedYAML)) {
                throw new Error(`Could not extract Markdown and/or YAML from valid file path provided; path is ${filePath}, content is ${content}.`);
            }

            return {
                ...item,
                ...parsedYAML,
                md,
                // If return did not happen earlier, filePath is valid; add it
                sourcePath: join(dirname(entryYAMLFilePath), item.data),
            };

        })


        // Add masterConfig as content of structure's entry point. Reason: Only when masterConfig
        // has its own entry, its files will be copied; and having its own folder prevents
        // name clashes (if e.g. objects is copied as a source and 'Objects' is the name of
        // a first leve menu entry)
        .map((item, path) => {
            if (path.length === 1 && path[0] === 0) {
                return {
                    ...item,
                    ...masterConfig,
                    // masterConfig is not a file (therefore sourcePath is not added above) while
                    // files (e.g. sources) must be able to be copied. Therefore we have to add a
                    // sourcePath.
                    sourcePath: entryYAMLFilePath,
                    showInMenu: false,
                };
            } else return item;
        })


        // Add title property; use md file's title property (from yaml) part if it exists, else
        // name of the item in the entry YAML file
        .map((item) => {
            // Use original data as title property or title from .md file if it exists
            const { data, ...rest } = item;
            return {
                ...rest,
                // Use title property from YAML if it exists, else original entry's value (yaml does
                // not seem to be valid, item is not clickable)
                title: item?.title || item.data,
            };
        })

        .map((item, path) => ({
            ...item,
            relativePathToRootDirectory: Array
                .from({ length: path.length })
                .map(() => '..')
                .join('/'),
        }))


        // Add paths (indexes of ancestor elements) to every entry in menu (needed to only keep
        // children of *that* path); path is e.g. [0, 2, 1] for the second child of the third child
        // of the first entry.
        .map((item, path) => ({
            ...item,
            path,
        }))


        // Add destination path: use normalized ancestors' titles to create it, joined by /
        .map((item, path, original) => {
            const segments = getFamilyTree(original, item.path);
            const destination = segments
                .map(({ title }) => title)
                // Remove previous file ending
                .map(normalizeName)
                .join('/');
            return {
                ...item,
                // Only add destination if there is a source; if not, menu entry will not be
                // represented by a page
                ...(item.sourcePath ? { destinationPath: destination } : {}),
            };
        })


        // Convert all sources to an object with properties source (absolute path to source) and
        // destination (path to destination, seen from entry YAML file).
        .map(adjustSources)


        // Add current path to scriptSources, styleSources and twigNamespaces before they are merged
        .map(adjustPaths)


        // Merge parent config into child config if child config does not contain the corresponding
        // keys
        .map((item, path, original) => ({
            ...item,
            ...mergeProperties(
                getFamilyTree(original, item.path),
                [
                    'styleSources',
                    'scriptSources',
                    'paths',
                    'scripts',
                    'project',
                    'twigFunctions',
                    'twigFilters',
                    'twigNamespaces',
                    'twigData',
                ],
            ),
        }))


        // Make different paths relative (used for destination that can be placed anywhere and
        // moved around after it has been generated):
        // - Script and style tags will use src attributes to link code from within a documentation
        //   page; make them relative (to the current page's path)
        // - paths that link to sources (which are only copied once)
        .map((item) => ({
            ...item,
            // Script sources
            ...((item.destinationPath && item.scriptSources) ? {
                scriptSources: item.scriptSources
                    .map((destination) => relative(item.destinationPath, destination)),
            } : {}),
            // Style sources
            ...((item.destinationPath && item.styleSources) ? {
                styleSources: item.styleSources
                    .map((destination) => relative(item.destinationPath, destination)),
            } : {}),
            // Paths
            ...((item.destinationPath && item.paths) ? {
                paths: mapObject(
                    item.paths,
                    (destination) => relative(item.destinationPath, destination),
                ),
            } : {}),

        }))



        // Create one entry per file; contains sourcePath, destinationPath, title and menu
        // (hierarchical structure for the given entry, where only children relevant for the entry
        // are present; all other children removed)
        .map((item, currentPath, original) => {
            // Only preserve a reduced set of properties for the menu to keep things as tidy as
            // possible
            const propertiesToPreserveInMenu = [
                'destinationPath',
                'title',
                'showInMenu',
            ];
            // Remove children from item as we flatten things out; children are only needed in menu
            // by now
            const { children, path, ...rest } = item;
            const menuWithAllItems = clearMenu(original, path, propertiesToPreserveInMenu);
            const menuWithoutInvisibles = removeHiddenEntriesFromMenu(menuWithAllItems);
            const menuWithRelativePaths = mapTree(menuWithoutInvisibles, (menuEntry) => ({
                ...menuEntry,
                // Get relative path to menu entries (from current documentation page's path).
                // Only update paths if it's not a menu entry without a link.
                ...(item.destinationPath && menuEntry.destinationPath ? {
                    destinationPath: relative(item.destinationPath, menuEntry.destinationPath)
                } : {}),
            }));
            menuEntries.push({
                ...rest,
                menu: menuWithRelativePaths,
            });
        });

    return menuEntries;

};

