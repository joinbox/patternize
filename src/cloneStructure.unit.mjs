import test from 'ava';
import cloneStructure from './cloneStructure.mjs';

test('clones an array', (t) => {
    const original = [true, 0, 'yes'];
    const clone = cloneStructure(original);
    t.deepEqual(original, clone);
    t.not(original, clone);
    // Modifying the original does not change the clone
    original[0] = false;
    t.is(clone[0], true);
});

test('clones an object', (t) => {
    const original = { a: 2, b: false, c: 'yes' };
    const clone = cloneStructure(original);
    t.deepEqual(original, clone);
    t.not(original, clone);
    // Modifying the original does not change the clone
    original.a = 4;
    t.is(clone.a, 2);
});

test('clones deep', (t) => {
    const original = { a: 2, b: [0, false], c: [{ nested: true }] };
    const clone = cloneStructure(original);
    t.deepEqual(original, clone);
    t.not(original, clone);
    // Modifying the original does not change the clone
    original.c[0].nested = false;
    t.is(clone.c[0].nested, true);
});
