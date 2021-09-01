import { join, dirname } from 'path';
import readAndParseYAML from './readAndParseYAML.mjs';
import mapTree from './mapTree.mjs';
import validatePatternYAML from './validatePatternYAML.mjs';
import generateMenuStructure from './generateMenuStructure.mjs';
import extractTitle from './extractTitle.mjs';
import clearMenu from './clearMenu.mjs';
import normalizeName from './normalizeName.mjs';
import getFamilyTree from './getFamilyTree.mjs';

/**
 * Reads *main* pattern YAML file, gathers all necessary information and returns a structure that
 * can be used to generate the documentation for all patterns (one at a time).
 * @param {string} yamlFilePath
 * @returns {array}     Array in the form of:
 *                      [{
 *                          title: 'Name of the Pattern',
 *                          sourcePath: 'path/to/the/doc-file.md (relative to YAML file)',
 *                          menu: [{
 *                              title: 'Title of Entry',
 *                              active: true,
 *                              children: [(nested entries of the same type)]
 *                          }]
 *                      }]
 */
export default (yamlFilePath) => {

    const yaml = readAndParseYAML(yamlFilePath);
    validatePatternYAML(yaml);

    const { structure } = yaml;

    // Convert pure YAML array to nexted array with children: { name: 'name', children: [] }
    const structuredMenu = generateMenuStructure(structure);

    // Fetch titles from MD files defined in YAML structure. If item.data is a (valid) path, add
    // sourcePath property.
    const menuWithTitles = mapTree(structuredMenu, (item) => {
        const titleFromYAML = extractTitle(join(dirname(yamlFilePath), item.data));
        console.log('tfy', titleFromYAML, join(dirname(yamlFilePath), item.data));
        return {
            ...(item.children ? { children: item.children } : {}),
            // Use titleFromYAML if file and title exist; else use original name
            title: titleFromYAML || item.data,
            ...(titleFromYAML ? { sourcePath: item.data } : {}),
        };
    });

    // Add paths (indexes of ancestor elements) to every entry in menu (needed to only keep
    // children of *that* path)
    const menuWithPaths = mapTree(menuWithTitles, (item, path) => ({
        ...item,
        path,
    }));

    // Add destination path (use ancestors' titles to create it)
    const menuWithDestinations = mapTree(menuWithPaths, (item) => {
        const segments = getFamilyTree(menuWithPaths, item.path);
        const destination = segments
            .map(({ title }) => title)
            // Remove previous file ending
            .map((title, index, arr) => (index === arr.length - 1 ?
                title.replace(/\.[a-z]{2,4}/, '') : title))
            .map(normalizeName)
            .join('/');
        return {
            ...item,
            // Only add destination if there is a source; if not, menu entry will not be
            // represented by a page
            ...(item.sourcePath ? { destinationPath: `${destination}.html` } : {}),
        };
    });

    // Create one entry per file; contains sourcePath, destinationPath, title and menu
    // (hierarchical structure for the given entry, where only children relevant for the entry
    // are present; all other children removed)
    const menuEntries = [];
    mapTree(menuWithDestinations, (item) => {
        menuEntries.push({
            ...item,
            menu: clearMenu(menuWithDestinations, item.path),
        });
    });

    console.dir(menuEntries, { depth: null });

    return menuEntries;

};

