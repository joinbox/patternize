import test from 'ava';
import validatePatternYAML from './validatePatternYAML.mjs';

test('validates pattern yaml', (t) => {
    t.throws(() => validatePatternYAML({ structure: null }), {
        message: /structure property .* null/,
    });
});
