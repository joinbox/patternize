import { join, basename } from 'path';

/**
 * Adds destination path to files that must be copied to documentation folder (scripts, styles)
 */
export default (object, properties, sourcePath, destinationPath) => {
    const clone = { ...object };
    properties.forEach((property) => {
        if (!Object.hasOwnProperty.call(clone, property)) return;
        clone[property] = object[property].map((path) => [
            // Make sure source path is relative to entry YAML file. If child items inherit
            // scripts/styles from current (parent) entry, path must still point to parent
            // directory.
            join(sourcePath, path),
            join(destinationPath, basename(path)),
        ]);
    });
    return clone;
};
