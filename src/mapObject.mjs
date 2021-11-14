export default (object, mappingFunction) => (
    [...Object.entries(object)].reduce((prev, [key, value]) => ({
        ...prev,
        [key]: mappingFunction(value, key),
    }), {})
);
