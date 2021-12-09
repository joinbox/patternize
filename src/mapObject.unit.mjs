import test from 'ava';
import mapObject from './mapObject.mjs';

test('maps object with all properties', (t) => {
    const object = {
        a: 5,
        b: 3,
    };
    const result = mapObject(object, (value) => value + 1);
    t.deepEqual(result, {
        a: 6,
        b: 4,
    });
});

test('passes value and key to mapping function', (t) => {
    const object = { a: 4 };
    const parameters = [];
    mapObject(object, (...args) => parameters.push(args));
    t.deepEqual(parameters, [[4, 'a']]);
});
