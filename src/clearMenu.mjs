import clearObject from './clearObject.mjs';

// Helper functions that decide if the path of the current object is an ancestor or the active
// item (where activePath is the path to the active item)
const isAncestor = (currentPath, activePath) => currentPath.every(
    (item, index) => activePath[index] === item,
);
const isActive = (currentPath, activePath) => activePath.every(
    (item, index) => currentPath[index] === item,
) && currentPath.length === activePath.length;

/**
 * Removes all children from the nested array that are not relevant for the current entry,
 * adds property active: true for all ancestors of the current element and
 * removes all unnecessary properties.
 * @param {object[]} structure  Each object may have a child property that contains its
 *                              descendants.
 * @param {number[]} paths      Path to the current entry as indexes; every entry represents
 *                              a hierarchy level.
 * @param {string[]} properties List of properties that should be preserved
 */
const clean = (structure, activePath, properties, parentPath = []) => (
    structure.map((item, index) => {
        // Current entry is an ancestor: Clean its children if it contains any
        // If current ancestor does not have a destinationPath, it's just a (non clickable) label;
        // also show all its children because they cannot be expanded by clicking it (remember:
        // it's not clickable 😇)
        const currentPath = [...parentPath, index];
        if (isAncestor(currentPath, activePath) || !item.destinationPath) {
            return {
                ...clearObject(item, properties),
                ...(item.children ? {
                    children: clean(
                        item.children,
                        activePath,
                        properties,
                        currentPath,
                    ),
                } : {}),
                // Only set active: true if item is active (and not missing destinationPath)
                ...(isActive(currentPath, activePath) ? { active: true } : {}),
            };
        }
        // Current entry is not an ancestor: Remove its children
        else {
            const { children, ...clone } = item;
            return clearObject(clone, properties);
        }
    })
);

export default clean;
