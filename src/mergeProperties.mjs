/**
 * Merges selected properties of multiple objects from left to right; only overwrites properties
 * to the right if they are not present on the object to the right
 */
export default (objects, properties) => (
    objects.reduce((prev, item) => {
        const clone = { ... item};
        properties.forEach((property) => {
            // New object already contains this property: Don't copy it
            if (clone.hasOwnProperty(property)) return;
            // Previous object does not have this property: There's nothing to copy
            if (!prev.hasOwnProperty(property)) return;
            clone[property] = prev[property];
        });
        return clone;
    })
)