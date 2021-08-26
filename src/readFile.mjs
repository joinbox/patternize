import { readFileSync } from 'fs';

/**
 * Reads a file; returns null if file does not exist
 */
export default (path) => {
    try {
        return readFileSync(path, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') return null;
        throw err;
    }
};
