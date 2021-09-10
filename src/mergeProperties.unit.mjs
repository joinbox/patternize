import test from 'ava';
import mergeProperties from './mergeProperties.mjs';

test('gradually merges from right to left', (t) => {
    const data = [{
        a: 5,
        b: 4,
        c: 3,
    }, {
        a: 2,
        b: 1,
    }, {
        a: 0,
    }];
    const merged = mergeProperties(data, ['a', 'b', 'c']);
    t.deepEqual(merged, { a: 0, b: 1, c: 3});
})

test('only merges properties inexistent on original', (t) => {
    const data = [{
        a: 5,
        b: 4,
    }, {
        // A property with value undefined is still a defined property
        a: undefined,
    }];
    const merged = mergeProperties(data, ['a', 'b']);
    t.deepEqual(merged, { a: undefined, b: 4});
});

test('only merges provided properties', (t) => {
    const data = [{
        a: 5,
        b: 4,
        c: 4,
    }, {
        // A property with value undefined is still a defined property
        a: 2,
    }];
    const merged = mergeProperties(data, ['a', 'b']);
    t.deepEqual(merged, { a: 2, b: 4});
});

test('does not clone empty properties', (t) => {
    const data = [{
        a: 5,
        b: 4,
        c: 4,
    }, {
        // A property with value undefined is still a defined property
        a: 2,
    }];
    const merged = mergeProperties(data, ['a', 'b']);
    t.deepEqual(merged, { a: 2, b: 4});
});