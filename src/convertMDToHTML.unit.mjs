import test from 'ava';
import convertMDToHTML from './convertMDToHTML.mjs';

test('does not fail converting markdown to html', (t) => {
    const result = convertMDToHTML({
        md: '#test',
        sourcePath: 'test',
    }, 'base/path');
    t.is(result.includes('test'), true);
});

test('works with parameters', (t) => {
    // Use array/join to not escape ``` which will break the code type
    const md = ['#button'];
    md.push('Creates a button');
    md.push('```twig');
    md.push('<img src="{{paths.image}}" alt="{{data.altText|translate}}" />');
    md.push('```');
    const item = {
        md: md.join('\n'),
        sourcePath: 'test',
        paths: { image: 'image.png' },
        twigData: { altText: 'alt text' },
        twigFilters: { translate: (text) => `t ${text}` },
    };
    const result = convertMDToHTML(item);
    t.is(result.includes('src="image.png"'), true);
    t.is(result.includes('alt="t alt text"'), true);
});
