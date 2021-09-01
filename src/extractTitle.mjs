import readFile from './readFile.mjs';
import extractContentTypes from './extractContentTypes.mjs';
import parseYAML from './parseYAML.mjs';

/**
 * Extracts title from a pattern file. Needed to quickly generate menu structure before truly
 * parsing a yaml/md file.
 */
export default (path) => {
    const content = readFile(path);
    if (!content) return null;
    const { yaml } = extractContentTypes(content);
    if (!yaml) return null;
    const { title } = parseYAML(yaml);
    return title;
};
