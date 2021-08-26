import test from 'ava';
import addPath from './addPath.mjs';

test('adds path', (t) => {
    const data = [
        {
            name: 'a',
            children: [
                { name: 'b' },
                { name: 'c', children: [{ name: 'd' }]}
            ],
        }, {
            name: 'e',
        },
    ];
    const result = addPath(data);
    t.deepEqual(result, [
        {
            name: 'a',
            path: [],
            children: [
                {
                    name: 'b',
                    path: ['a'],
                }, {
                    name: 'c',
                    path: ['a'],
                    children: [{
                        name: 'd',
                        path: ['a', 'c'],
                    }],
                },
            ],
        }, {
            name: 'e',
            path: [],
        },
    ]);
});
