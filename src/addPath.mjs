/**
 * Traverses a (nested) array and adds path property to every entry; path is an array of the
 * parent elements property with name namePropertyName.
 * @param {array} data
 * @param {array} path
 */
const walk = (data, namePropertyName = 'name', path = []) => (
    data.map(item => ({
        ...item,
        path,
        ...(item.children ? {
            children: walk(item.children, namePropertyName, [...path, item[namePropertyName]]),
        } : {}),
    }))
);

export default walk;
