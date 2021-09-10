import test from 'ava';
import validateYAML from './validateYAML.mjs';

test('fails if yaml is invalid', (t) => {
    t.throws(() => validateYAML({ title: 0 }), {
        message: /Title .* be a string .* is number instead*/,
    });
});

test('works with valid yaml', (t) => {
    t.is(validateYAML({}), true);
});

