/**
 * Returns ancestors of an element and the element itself; path to the element must be provided
 * as an array of indices (see path).
 * @param {object[]} data       Every object must contain the following properties:
 *                              - title: name of the current entry
 *                              - children (optional): to nest items
 * @param {number[]} path       Path to the current item in data (indexes of the ancestor elements)
 */
export default (data, path) => {
    // Get title of all ancestors to create path from it
    const { segments } = path.reduce((prev, currentPathSegment) => ({
        segments: [...prev.segments, prev.parent[currentPathSegment]],
        parent: prev.parent[currentPathSegment].children,
    }), { segments: [], parent: data });
    return segments;
};
