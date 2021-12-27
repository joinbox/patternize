import test from 'ava';
import adjustTwigImports from './adjustTwigImports.mjs';

test('adjusts import paths', (t) => {
    // Double quotes
    const twig1 = '<div>test</div>{% include "dir/test.twig" %}<hr/>';
    t.is(
        adjustTwigImports(twig1, '/base'),
        '<div>test</div>{% include "/base/dir/test.twig" %}<hr/>',
    );
    // Single quotes
    const twig2 = '<div>test</div>{% include \'dir/test.twig\' %}';
    t.is(
        adjustTwigImports(twig2, '/base'),
        '<div>test</div>{% include \'/base/dir/test.twig\' %}',
    );
    // Too many spaces
    const twig3 = '{%   include   \'dir /test.twig\'   %}';
    t.is(
        adjustTwigImports(twig3, '/base'),
        '{%   include   \'/base/dir /test.twig\'   %}',
    );
});

test('works with embed', (t) => {
    const twig1 = '<div>test</div>{% embed "dir/test.twig" %}<hr/>';
    t.is(
        adjustTwigImports(twig1, '/base'),
        '<div>test</div>{% embed "/base/dir/test.twig" %}<hr/>',
    );
    const twig2 = '<div>test</div>{% embed "dir/test.twig" ignore missing %}<hr/>';
    t.is(
        adjustTwigImports(twig2, '/base'),
        '<div>test</div>{% embed "/base/dir/test.twig" ignore missing %}<hr/>',
    );
});

test('fails if brace and % are missing', (t) => {
    const twig = '<div>{{ include "dir/test.twig" }}';
    t.is(adjustTwigImports(twig, '/User'), twig);
});

test('works with multiple imports and lines', (t) => {
    const twig = `
        <div>{% include "dir/test1.twig" with {"test": true} only %}
        <div>{% embed 'dir/test2.twig' %}
    `;
    const result = adjustTwigImports(twig, '/User');
    t.is(result.includes('{% include "/User/dir/test1.twig" with'), true);
    t.is(result.includes('{% embed \'/User/dir/test2.twig\' %}'), true);
});

test('does not rewrite namespaces', (t) => {
    const twig = '<div>test</div>{% include "@ns/test.twig" %}<hr/>';
    t.is(
        adjustTwigImports(twig, '/base'),
        '<div>test</div>{% include "@ns/test.twig" %}<hr/>',
    );
});
