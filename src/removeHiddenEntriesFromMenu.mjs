/**
 * Removes all items with "showInMenu: false" from the menu by taking their children up one level.
 * @param {object[]} structure  Each object may have a child property that contains its
 *                              descendants.
 */
const clean = (structure) => (
    structure.flatMap((item) => {
        if (item.showInMenu === false) {
            return item.children || [];
        } else {
            return [item];
        }
    })
);

export default clean;
