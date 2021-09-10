import test from 'ava';
import parseMarkdown from './parseMarkdown.mjs';

test('parses markdown', (t) => {
    t.is(parseMarkdown({ markdown: '# heading' }), '<h1 id="heading">heading</h1>\n');
});

test('uses renderers in order provided', (t) => {
    const renderer1 = {
        heading: (text, level) => `first-${level}`,
    };
    const renderer2 = {
        heading: (text, level) => `second-${level}`,
    };
    t.is(parseMarkdown({ markdown: '# heading', renderers: [renderer1, renderer2] }), 'second-1');
});
