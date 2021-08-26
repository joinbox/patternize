import readFile from './readFile.mjs';
import extractContentTypes from './extractContentTypes.mjs';
import parseYAML from './parseYAML.mjs';

/**
 * Extracts title from a pattern file
 */
export default (path) => {
    const content = readFile(path);
    if (!content) return null;
    const { yaml } = extractContentTypes(content);
    const { name } = parseYAML(yaml);
    return name;
};
