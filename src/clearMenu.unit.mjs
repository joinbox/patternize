import test from 'ava';
import clearMenu from './clearMenu.mjs';

test('clears entries', (t) => {

    const data = [
        // No children
        { name: 'first', destinationPath: true },
        // Current entry
        {
            name: 'second',
            destinationPath: true,
            children: [{
                destinationPath: true,
                name: 'second-first',
                children: [
                    { name: 'second-first-first', destinationPath: true },
                    { name: 'second-first-second', destinationPath: true },
                ],
            }],
        },
        // With children
        {
            name: 'third',
            destinationPath: true,
            children: [{ name: 'third-first'}],
        },
    ];
    const result = clearMenu(data, [1, 0, 1]);
    t.deepEqual(result, [
        { name: 'first', destinationPath: true },
        {
            name: 'second',
            destinationPath: true,
            children: [{
                name: 'second-first',
                destinationPath: true,
                children: [
                    { name: 'second-first-first', destinationPath: true },
                    {
                        name: 'second-first-second',
                        destinationPath: true,
                        active: true,
                    },
                ],
            }],
        },
        { name: 'third', destinationPath: true },
    ]);

});

test('only preserves desired properties', (t) => {
    const data = [
        {
            name: 'second',
            toRemove: 3,
            children: [{
                name: 'second-first',
                toRemove: 5,
                destinationPath: true,
            }],
            destinationPath: true,
        },
        {
            name: 'third',
            toRemove: 7,
            destinationPath: true,
        },
    ];
    const result = clearMenu(data, [0, 0], ['name']);
    t.deepEqual(result, [
        {
            name: 'second',
            children: [{
                name: 'second-first',
                active: true,
            }],
        },
        { name: 'third' },
    ]);

});

test('entries without destinationPath are always open (but not active)', (t) => {
    const data = [
        {
            name: 'second',
            destinationPath: 'path/to/dest',
            children: [{
                name: 'second-first',
            }],
        },
        // No destinationPath: Must be open, but not active
        {
            name: 'third',
            children: [{
                name: 'second-first',
                destinationPath: 'yes',
            }],
        },
    ];
    const result = clearMenu(data, [0], ['name']);
    t.deepEqual(result, [
        {
            name: 'second',
            active: true,
            children: [{
                name: 'second-first',
            }],
        },
        {
            name: 'third',
            children: [{
                name: 'second-first',
            }],
        },
    ]);

});
