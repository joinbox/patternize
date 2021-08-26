import test from 'ava';
import mapRecursively from './mapRecursively.mjs';

test('maps recursively', (t) => {
    const original = [
        1,
        2,
        [3, 4, [5]],
    ];
    const result = mapRecursively(original, a => a + 1);
    t.deepEqual(result, [
        2,
        3,
        [4, 5, [6]],
    ]);
});
