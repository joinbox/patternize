import test from 'ava';
import clearMenu from './clearMenu.mjs';

test('clears entries', (t) => {

    const data = [
        // No children
        { name: 'first' },
        // Current entry
        {
            name: 'second',
            children: [{
                name: 'second-first',
                children: [
                    { name: 'second-first-first' },
                    { name: 'second-first-second' },
                ],
            }],
        },
        // With children
        {
            name: 'third',
            children: [{ name: 'third-first'}],
        },
    ];
    const result = clearMenu(data, [1, 0, 1]);
    t.deepEqual(result, [
        { name: 'first' },
        {
            name: 'second',
            children: [{
                name: 'second-first',
                children: [
                    { name: 'second-first-first' },
                    {
                        name: 'second-first-second',
                        active: true,
                    },
                ],
                active: true,
            }],
            active: true,
        },
        { name: 'third' },
    ]);

});
