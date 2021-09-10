import test from 'ava';
import convertMDToHTML from './convertMDToHTML.mjs';

test('does not fail converting markdown to html', (t) => {
    const result = convertMDToHTML({
        md: '#test',
        sourcePath: 'test',
    }, 'base/path');
    t.is(result.includes('test'), true);
});
