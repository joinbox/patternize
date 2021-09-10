import test from 'ava';
import renderPage from './renderPage.mjs';

test('renders page', (t) => {
    const result = renderPage({});
    t.is(typeof result, 'string');
});
