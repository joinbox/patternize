/**
 * Walks through a structure that consists of entities with a property that contains their children
 */
const mapTree = (data, mapFunction, path = [], original = data) => {
    if (!Array.isArray(data)) {
        throw new Error(`mapTree: The first parameter passed must be an array, is ${JSON.stringify(data)} instead.`);
    }
    return data.map((item, index) => ({
        // Pass original data as third parameter to callback to allow for easy access within it;
        // this prevents us from using an outside variable within the callback
        ...mapFunction(item, [...path, index], original),
        ...(item.children ? {
            children: mapTree(item.children, mapFunction, [...path, index], original),
        } : {}),
    }));
};

export default mapTree;
