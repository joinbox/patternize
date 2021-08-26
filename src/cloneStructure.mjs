/**
 * Deep-clones arrays/objects
 */
const clone = (original) => {
    if (Array.isArray(original)) return original.map(clone)
    else if (typeof original === 'object' && original !== null) {
        return Object.entries(original).reduce((prev, [key, value]) => (
            { ...prev, [key]: clone(value) }
        ), {});
    } else return original;
};

export default clone;
