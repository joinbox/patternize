import test from 'ava';
import adjustTwigImports from './adjustTwigImports.mjs';

test('adjusts import paths', (t) => {
    // Double quotes
    const twig1 = '<div>test</div>{% include "dir/test.twig" %}';
    t.is(adjustTwigImports(twig1, '/base'), '<div>test</div>{% include "/base/dir/test.twig" %}');
    // Single quotes
    const twig2 = '<div>test</div>{% include  \'dir/test.twig\' ) %}';
    t.is(
        adjustTwigImports(twig2, '/base'),
        '<div>test</div>{% include  \'/base/dir/test.twig\' ) %}',
    );
});

test('fails if brace and % are missing', (t) => {
    const twig = '<div>{{ include "dir/test.twig" }}';
    t.is(adjustTwigImports(twig, '/User'), twig);
});
