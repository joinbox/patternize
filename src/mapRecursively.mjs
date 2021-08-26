/**
 * Maps an array recursively
 * @param {array} array
 * @param {function} cb
 */
const mapArray = (array, cb) => (
    array.map((item) => {
        if (Array.isArray(item)) return mapArray(item, cb);
        return cb(item);
    })
);

export default mapArray;