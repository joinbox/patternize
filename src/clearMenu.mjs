/**
 * Removes all children from the nested array that are not relevant for the current entry and
 * adds property active: true for all ancestors of the current element
 * @param {object[]} structure  Each object may have a child property that contains its
 *                              descendants.
 * @param {number[]} paths      Path to the current entry as indexes; every entry represents
 *                              a hierarchy level.
 */
const clean = (structure, path) => (
    structure.map((item, index) => {
        // Current entry is an ancestor: Clean its children if it contains any
        if (index === path[0]) {
            return {
                ...item,
                ...(item.children ? { children: clean(item.children, path.slice(1)) } : {}),
                active: true,
            };
        }
        // Current entry is not an ancestor: Remove its children
        else {
            const { children, ...clone } = item;
            return clone;
        }
    })
);

export default clean;
