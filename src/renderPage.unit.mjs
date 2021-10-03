import test from 'ava';
import renderPage from './renderPage.mjs';

test('renders page', (t) => {
    const result = renderPage({ templatePath: './templates/page.twig' });
    t.is(typeof result, 'string');
});
