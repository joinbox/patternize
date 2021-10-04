import test from 'ava';
import renderPage from './renderPage.mjs';

test('renders page', async(t) => {
    const result = await renderPage({ templatePath: './templates/page.twig' });
    t.is(typeof result, 'string');
});
