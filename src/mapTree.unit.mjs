import test from 'ava';
import mapTree from './mapTree.mjs';

test('fails if data is not an array', (t) => {
    const data = [{
        children: true,
    }];
    t.throws(() => mapTree(data, item => item), {
        message: /an array, is true/,
    });
});

test('maps over a tree', (t) => {
    const data = [
        {
            value: 1,
            children: [{ value: 2 }, { value: 3, children: [{ value: 4 }] }],
        }, {
            value: 5,
        },
    ];
    const result = mapTree(data, item => ({ ...item, value: item.value + 1 }));
    t.deepEqual(result, [
        {
            value: 2,
            children: [{ value: 3 }, { value: 4, children: [{ value: 5 }] }],
        }, {
            value: 6,
        },
    ]);
});

test('passes correct path to map function', (t) => {
    const paths = [];
    const data = [
        {
            value: 1,
            children: [
                { value: 2 },
                {
                    value: 3,
                    children: [
                        { value: 4 },
                    ],
                }],
        }, {
            value: 5,
        },
    ];
    mapTree(data, (item, path) => {
        paths.push(path);
    });
    t.deepEqual(paths, [
        // Starts from outermost; paths are «stacked» for every item (includes whole hierarchy
        // for every child)
        [],
        [0],
        [0],
        [0, 1],
        [],
    ]);

});
