/**
 * Normalizes any value to a valid path; needed to create destination path
 * @param {string} value
 * @returns {string}
 */
export default value => value
    .toLowerCase()
    // Remove pre-existing dashes
    .replace(/\-+/, '')
    // Replace spaces with dashes
    .replace(/\s+/g, '-')
    // Remove everthing invalid
    .replace(/[^a-z0-9-]/g, '');

