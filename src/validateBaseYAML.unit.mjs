import test from 'ava';
import validateBaseYAML from './validateBaseYAML.mjs';

test('validates pattern yaml', (t) => {
    t.throws(() => validateBaseYAML({ structure: null }), {
        message: /structure property .* null/,
    });
});

test('validates scripts and styles', (t) => {
    t.throws(() => validateBaseYAML({ structure: {}, scripts: 'notAnArray' }));
    t.throws(() => validateBaseYAML({ structure: {}, styles: ['string', 5] }));
});