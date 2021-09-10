import test from 'ava';
import clearObject from './clearObject.mjs';

test('returns cloned original if no properties are passed', (t) => {
    const original = { a: 5, b: 2 };
    t.deepEqual(clearObject(original), original);
    t.not(clearObject(original), original);
});

test('only returns properties provided', (t) => {
    t.deepEqual(clearObject({
        a: 5,
        b: 2, 
        c: 3
    }, ['a', 'c']), {
        a: 5,
        c: 3,
    })
});

test('only clones properties that exist on original', (t) => {
    t.deepEqual(clearObject({ a: 5 }, ['c']), {});
});
