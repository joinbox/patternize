import test from 'ava';
import validateBaseYAML from './validateBaseYAML.mjs';

test('validates structure', (t) => {
    t.throws(() => validateBaseYAML({ structure: null }), {
        message: /structure property .* null/,
    });
});

test('validates project name', (t) => {
    t.throws(() => validateBaseYAML({ structure: {}, project: null }), {
        message: /property project .* null/,
    });
});

test('validates scripts and styles', (t) => {
    const validBase = {
        structure: {},
        project: '',
    };
    t.throws(() => validateBaseYAML({ ...validBase, scripts: 'notAnArray' }));
    t.throws(() => validateBaseYAML({ ...validBase, styles: ['string', 5] }));
});
