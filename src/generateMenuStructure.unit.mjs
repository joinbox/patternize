import test from 'ava';
import generateMenuStructure from './generateMenuStructure.mjs';

test('creates expected structure', (t) => {
    const original = [
        'a',
        ['b', 'c', ['d']],
        'e',
    ];
    const result = generateMenuStructure(original);
    t.deepEqual(result, [
        {
            data: 'a',
            children: [
                { data: 'b' },
                {
                    data: 'c',
                    children: [
                        { data: 'd' },
                    ],
                },
            ],
        },
        { data: 'e' },
    ]);
});

test('handles children without title', (t) => {
    // If there are two consecutive arrays as children, second will not have a title. Handle
    // it gracefully.
    const original = [
        'a',
        ['b', 'c', ['d']],
        ['e', 'f'],
    ];
    const result = generateMenuStructure(original);
    t.deepEqual(result[1], {
        children: [
            { data: 'e' },
            { data: 'f' },
        ],
    });
});
