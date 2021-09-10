import test from 'ava';
import validatePaths from './validatePaths.mjs';

test('validates path array', (t) => {
    t.throws(() => validatePaths({ scripts: null }, ['scripts']), {
        message: /scripts property to be .* is null/,
    });
    t.notThrows(() => {validatePaths({ scripts: [] }, ['scripts'])});
});

test('validates path contents', (t) => {
    t.throws(() => validatePaths({ scripts: ['a', 4] }, ['scripts']), {
        message: /to be strings\. Values \[4\]/,
    });
});