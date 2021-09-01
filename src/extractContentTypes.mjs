/**
 * Extracts YAML from a MD/YAML file; returns both parts separately
 */
export default (content) => {
    const match = /((?:^|\r|\n)-{3}[\r\n](.*)\.{3}(?:\r|\n|$))/s.exec(content);
    const yaml = match && match.length > 2 ? match[2] : null;
    const md = match ? content.replace(match[1], '') : content;
    return { yaml, md };
};
