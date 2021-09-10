/**
 * Validates YAML part of a documentation file
 */
export default (yaml) => {
    if (!['undefined', 'string'].includes(typeof yaml.title)) {
        throw new Error(`validateYAML: Title property must be a string if it exists; is ${typeof yaml.title} instead.`);
    }
    return true;
};
