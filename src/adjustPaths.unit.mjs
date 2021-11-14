import test from 'ava';
import adjustPaths from './adjustPaths.mjs';

test('adjusts scriptSources, styleSources, twigNamespaces', (t) => {
    const item = {
        scriptSources: ['src/script.js', 'src/main.mjs'],
        styleSources: ['src/style.css'],
        twigNamespaces: {
            ns: 'twig/icons',
        },
        destinationPath: '/output/',
    };
    const result = adjustPaths(item);
    t.deepEqual(result, {
        scriptSources: ['/output/src/script.js', '/output/src/main.mjs'],
        styleSources: ['/output/src/style.css'],
        twigNamespaces: {
            ns: '/output/twig/icons',
        },
        destinationPath: item.destinationPath,
    });
});

test('does not fail if properties are not present', (t) => {
    const item = {
        destinationPath: '/output/',
    };
    const result = adjustPaths(item);
    t.deepEqual(item, result);
});
