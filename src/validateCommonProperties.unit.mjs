import test from 'ava';
import validateCommonProperties from './validateCommonProperties.mjs';


test('validates twig properties', (t) => {
    // Not an object
    t.throws(() => validateCommonProperties({ twigFunctions: null }), {
        message: /property twigFunctions is expected to be an object, is null/,
    });
    // An object with invalid values
    t.throws(() => validateCommonProperties({ twigFunctions: { 0: 2 } }), {
        message: /entry in twigFunctions .* got 0:2 instead/,
    });
    t.notThrows(() => validateCommonProperties({ twigFunctions: { t: 'value => value' } }));
});

test('validates paths', (t) => {
    t.throws(() => validateCommonProperties({ scripts: null }));
    t.notThrows(() => validateCommonProperties({ scripts: ['a'] }));
});

