/**
 * Extracts YAML from a MD/YAML file; returns both parts separately
 */
export default (content) => {
    const match = /(?:^|\r|\n)-{3}[\r\n].*-{3}(?:\r|\n|$)/s.exec(content);
    const yaml = match ? match[0].replace(/-{3}/g, '') : null;
    const md = match ? content.replace(match, '') : content;
    return { yaml, md };
};
