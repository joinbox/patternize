import readFile from './readFile.mjs';
import parseYAML from './parseYAML.mjs';

/**
 * Reads a YAML file from file system, parses and returns it
 * @param {string} path
 */
export default (path) => {
    const content = readFile(path);
    return parseYAML(content);
};

