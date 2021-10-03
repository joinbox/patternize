import test from 'ava';
import createIndexRedirect from './createIndexRedirect.mjs';

test('creates redirect html file', (t) => {
    const destination = '/path/to/destination';
    const result = createIndexRedirect({
        templatePath: './templates/home.twig',
        destination,
    });
    t.is(result.includes(`content="0;url=${destination}"`), true);
});
