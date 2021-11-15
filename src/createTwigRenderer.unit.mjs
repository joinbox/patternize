
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import test from 'ava';
import createTwigRenderer from './createTwigRenderer.mjs';

/* eslint-disable no-template-curly-in-string */

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

test('returns a function', (t) => {
    const value = createTwigRenderer();
    t.is(typeof value, 'function');
});

test('works with twig functions', (t) => {
    const template = '{{ convert(5) }}';
    const result = createTwigRenderer({
        twigFunctions: {
            convert: '(value) => `<q>${value * 10}</q>`;',
        },
    })(template);
    t.is(result.includes('<q>50</q>'), true);
});

test('works with twig filters', (t) => {
    const template = '{{ 5|convert }}';
    const result = createTwigRenderer({
        twigFilters: {
            convert: '(value) => `<q>${value * 10}</q>`;',
        },
    })(template);
    t.is(result.includes('<q>50</q>'), true);
});

test('uses basePath for includes', (t) => {
    const template = '{% include \'button.twig\' with {\'text\': \'Custom Text\'} %}';
    const result = createTwigRenderer({
        basePath: join(basePath, 'test-data/input/button'),
    })(template);
    t.is(result.includes('<button'), true);
    t.is(result.includes('Custom Text'), true);
});

test('works with namespaces', (t) => {
    const template = '{% extends "@button/button.twig" %}';
    const result = createTwigRenderer({
        twigNamespaces: {
            button: join(basePath, 'test-data/input/button'),
        },
    })(template);
    t.is(result.includes('<button'), true);
    t.is(result.includes('Send'), true);
});

test('works with parameters (paths and data)', (t) => {
    const template = '<img src="{{ paths.image }}" alt="{{ data.altText }}" />';
    const result = createTwigRenderer({
        paths: {
            image: 'path/to/image.png',
        },
        data: {
            altText: 'alt text',
        },
    })(template);
    t.is(result, '<img src="path/to/image.png" alt="alt text" />');
});
