/**
 * Takes a nested array and modifies it to generate a menu-like structure of objects with
 * name (string) and children (array).
 * @param {array} menuData      Nested array of strings
 */
const convert = menuData => (
    // If entry following the current entry is an array, use it as children of the current menu
    // item; set skipNext to true as the next item must not be handled
    menuData.reduce((prev, entry, index, array) => {
        // Current entry is an array: data was used by previous iteration and added as children
        if (prev.skipNext) return { ...prev, skipNext: false };
        // Should not happen, but can: If there are two consecutive arrays, second one will not
        // have a title and must therefore be handled by itself
        if (Array.isArray(entry)) {
            return { ...prev, result: [...prev.result, { children: convert(entry) }] };
        }
        // Next item is an array: Convert them to children of the current entry
        else if (Array.isArray(array[index + 1])) {
            return {
                skipNext: true,
                result: [...prev.result, { data: entry, children: convert(array[index + 1]) }],
            };
        }
        // Regular entry without children
        else {
            return { ...prev, result: [...prev.result, { data: entry }] };
        }
    }, { skipNext: false, result: [] }).result
);

export default convert;
