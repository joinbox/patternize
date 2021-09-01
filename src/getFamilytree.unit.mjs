import test from 'ava';
import getFamilyTree from './getFamilyTree.mjs';

test('creates destination path', (t) => {
    const data = [
        {},
        {
            title: 'first',
            children: [{
                title: 'second',
                children: [
                    {},
                    {},
                    { title: 'third' },
                ],
            }],
        },
    ];
    const result = getFamilyTree(data, [1, 0, 2]);
    t.deepEqual(result, [
        data[1],
        data[1].children[0],
        data[1].children[0].children[2],
    ]);
});
