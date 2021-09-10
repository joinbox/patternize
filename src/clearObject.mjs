/**
 * Only preserves given properties of an object. Needed to remove unnecessary properties from config
 * to keep things tidy.
 */
export default (originalObject, properties) => {
    if (!properties) return { ...originalObject };
    const cleanObject = {};
    for (const prop of properties) {
        if (originalObject.hasOwnProperty(prop)) {
            cleanObject[prop] = originalObject[prop]
        }
    }
    return cleanObject;
}