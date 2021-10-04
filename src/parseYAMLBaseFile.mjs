import { join, dirname } from 'path';
import readAndParseYAML from './readAndParseYAML.mjs';
import mapTree from './mapTree.mjs';
import validateBaseYAML from './validateBaseYAML.mjs';
import generateMenuStructure from './generateMenuStructure.mjs';
import extractContentTypes from './extractContentTypes.mjs';
import readFile from './readFile.mjs';
import clearMenu from './clearMenu.mjs';
import normalizeName from './normalizeName.mjs';
import getFamilyTree from './getFamilyTree.mjs';
import validateYAML from './validateYAML.mjs';
import parseYAML from './parseYAML.mjs';
import mergeProperties from './mergeProperties.mjs';
import updateFilesToCopy from './updateFilesToCopy.mjs';

/**
 * Reads *main* pattern YAML file, gathers all necessary information and returns a structure that
 * can be used to generate the documentation for all patterns (one at a time).
 * All paths are relative to the base YAML file (if it's a source) or relative to the output
 * directory (if it's a destination).
 * @param {string} yamlFilePath
 * @returns {array}     Array in the form of:
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
export default (yamlFilePath) => {

    const baseFileYAML = readAndParseYAML(yamlFilePath);
    validateBaseYAML(baseFileYAML);
    const { structure } = baseFileYAML;
    // Convert pure YAML array to nexted array with children: { data: 'name', children: [] }
    const structuredData = generateMenuStructure(structure);


    // Fetch YAML and MD from .md files (if they exist)
    const structureWithYAMLAndMD = mapTree(structuredData, (item) => {

        // Try to read file; if it does not exist, return current item
        const filePath = join(dirname(yamlFilePath), item.data);
        const content = readFile(filePath);
        if (!content) {
            console.log(`parseYAMLBaseFile: Entry '${item.data}' in base YAML file's structure property is not a valid file path. Treating it as a crossheading.`);
            return item;
        }

        // Extract YAML and MD from file; validate YAML
        const { yaml, md } = extractContentTypes(content);
        const parsedYAML = parseYAML(yaml);
        if (!md || !validateYAML(parseYAML)) return item;

        return {
            ...item,
            yaml: parsedYAML,
            md,
            // If return did not happen earlier, filePath is valid; add it
            sourcePath: item.data,
        };

    });


    // Add title property
    const structureWithTitle = mapTree(structureWithYAMLAndMD, (item) => {
        // Use original data as title property or title from .md file if it exists
        const { data, ...rest } = item;
        return {
            ...rest,
            // Use title property from YAML if it exists, else original entry's value (yaml does
            // not seem to be valid, item is not clickable)
            title: item?.yaml?.title || item.data,
        };
    });


    // Add paths (indexes of ancestor elements) to every entry in menu (needed to only keep
    // children of *that* path); path is e.g. [0, 2, 1] for the second child of the third child
    // of the first entry.
    const structureWithPaths = mapTree(structureWithTitle, (item, path) => ({
        ...item,
        path,
    }));

    // Add destination path (use ancestors' titles to create it)
    const structureWithDestinations = mapTree(structureWithPaths, (item, path, original) => {
        const segments = getFamilyTree(original, item.path);
        const destination = segments
            .map(({ title }) => title)
            // Remove previous file ending
            // Update: Leave it; file will serve as a folder with content
            // .map((title, index, arr) => (index === arr.length - 1 ?
            //     title.replace(/\.[a-z]{2,4}/, '') : title))
            .map(normalizeName)
            .join('/');
        return {
            ...item,
            // Only add destination if there is a source; if not, menu entry will not be
            // represented by a page
            ...(item.sourcePath ? { destinationPath: `${destination}` } : {}),
        };
    });


    // Add destination paths for all files (styles, scripts) and make all source paths relative to
    // the base YAML file (because styles and scripts will be inherited by child elements where
    // the destination path will change, while the source path *must* stay the same)
    const filesToCopyProperties = ['scripts', 'styles'];
    const structureWithPathDestinations = mapTree(
        structureWithDestinations,
        (item) => ({
            ...item,
            ...(item.yaml ? {
                yaml: updateFilesToCopy(
                    item.yaml,
                    filesToCopyProperties,
                    dirname(item.sourcePath),
                    item.destinationPath,
                ),
            } : {}),
        }),
    );


    // Update scripts/styles on base YAML file before we merge it with the documentation's
    // YAML
    const baseWithPaths = updateFilesToCopy(baseFileYAML, filesToCopyProperties, '', '');
    // Merge parent config into child config if child config does not contain the corresponding
    // keys
    const structureWithMergedConfig = mapTree(
        structureWithPathDestinations,
        (item, path, original) => {
            const ancestors = getFamilyTree(original, item.path);
            return {
                ...item,
                // Use baseFile as root file
                yaml: mergeProperties(
                    [baseWithPaths, ...ancestors.map(({ yaml }) => yaml)],
                    [
                        'styles',
                        'scripts',
                        'project',
                        'twigFunctions',
                        'twigFilters',
                        'twigNamespaces',
                    ],
                ),
            };
        },
    );


    // Create one entry per file; contains sourcePath, destinationPath, title and menu
    // (hierarchical structure for the given entry, where only children relevant for the entry
    // are present; all other children removed)
    const menuEntries = [];
    mapTree(structureWithMergedConfig, (item, currentPath, original) => {
        // Only preserve a reduced set of properties for the menu to keep things as tidy as
        // possible
        const propertiesToPreserve = [
            'destinationPath',
            'title',
        ];
        // Remove children from item as we flatten things out; children are only needed in menu
        // by now
        const { children, path, ...rest } = item;
        menuEntries.push({
            ...rest,
            menu: clearMenu(original, item.path, propertiesToPreserve),
        });
    });

    return menuEntries;

};

