import { dirname } from 'path';
import { fileURLToPath } from 'url';
import test from 'ava';
import createRendererForMarked from './createRendererForMarked.mjs';
import { marked } from 'marked'


test('renders twig', (t) => {
    const twig = '<button>{{text}}</button>';
    const config = createRendererForMarked(res => res);
    t.is(typeof config.code, 'function');

    const result = config.code(twig, 'twig');
    t.is(result, `<div data-code>
<div class="tabs is-right is-small is-boxed">
<ul>
<li data-tab><a>Twig</a></li>
<li data-tab><a>HTML</a></li>
<li class="is-active" data-tab><a>Rendered</a></li>
</ul>
</div>
<div data-content hidden><pre><code class="language-twig">&lt;button&gt;{{text}}&lt;/button&gt;</code></pre></div>
<div data-content hidden><pre><code class="html">
&lt;button&gt;{{text}}&lt;/button&gt;
</code></pre></div>
<div data-content class="preview-container"><button>{{text}}</button></div>
</div>`);
});


test('renders other types of code', (t) => {
    const content = '<div>test</div>';
    const config = createRendererForMarked();
    const result = config.code(content, 'html');
    t.is(result, `<div data-code>
<div class="tabs is-right is-small is-boxed">
<ul>
<li class="is-active"><a>Original (Unknown Type)</a></li>
</ul>
</div>
<div data-content><pre><code class="language-html">&lt;div&gt;test&lt;/div&gt;</code></pre></div>
</div>`);
});

test('renders lists', (t) => {
    const config = createRendererForMarked();
    const result = config.list('body', true, 5);
    // Remove spaces at beginning of line (they are not important)
    t.is(result.replace(/\n\s+/g, '\n'), `
<ol class="list" start="5">
body
</ol>
`);
});

test('renders headings', (t) => {
    const config = createRendererForMarked();
    // Slugger is passed to the heading function. See https://marked.js.org/using_pro#renderer
    const result = config.heading('title', 2, 'title', new marked.Slugger());
    t.is(result, '<h2 id="title" class="title is-2">title</h2>');
});

test('renders paragraphs', (t) => {
    const config = createRendererForMarked();
    const result = config.paragraph('content');
    t.is(result, '<p class="paragraph">content</p>');
});
