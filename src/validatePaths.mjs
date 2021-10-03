/**
 * Validates an array of paths (e.g. scripts or styles)
 */
export default (object, property) => {

    // Only test properties if they exist. Scripts/styles are voluntary properties.
    if (Object.hasOwnProperty.call(object, property)) {
        const value = object[property];
        if (!Array.isArray(value)) {
            throw new Error(`validatePaths: Expected ${property} property to be an array, is ${value} instead.`);
        }
        const invalidScripts = value.filter((item) => typeof item !== 'string');
        if (invalidScripts.length) {
            throw new Error(`validatePaths: Expected all values of ${property} property to be strings. Values ${JSON.stringify(invalidScripts)} are invalid.`);
        }
    }

};
