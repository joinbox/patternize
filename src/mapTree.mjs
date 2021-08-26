/**
 * Walks through a structure that consists of entities with a property that contains their children
 */
const mapTree = (data, mapFunction, path = []) => {
    if (!Array.isArray(data)) {
        throw new Error(`mapTree: The first parameter passed must be an array, is ${JSON.stringify(data)} instead.`);
    }
    return data.map((item, index) => ({
        ...mapFunction(item, path),
        ...(item.children ? {
            children: mapTree(item.children, mapFunction, [...path, index]),
        } : {}),
    }));
};

export default mapTree;
