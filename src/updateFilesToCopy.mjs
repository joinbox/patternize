import { join, basename } from 'path';

/**
 * Adds destination path to files that must be copied to documentation folder (scripts, styles)
 */
export default (object, properties, destinationPath) => {
    const clone = { ...object };
    properties.forEach((property) => {
        if (!Object.hasOwnProperty.call(clone, property)) return;
        clone[property] = object[property].map((path) => [
            path,
            join(destinationPath, basename(path)),
        ]);
    });
    return clone;
};
