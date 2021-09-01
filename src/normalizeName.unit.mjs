import test from 'ava';
import normalizeName from './normalizeName.mjs';

test('normalizes name', (t) => {
    t.is(normalizeName('äU0/çM'), 'u0m');
});

test('handles spaces', (t) => {
    t.is(normalizeName('M-t A'), 'mt-a');
});
