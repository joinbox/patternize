import { dirname } from 'path';
import { fileURLToPath } from 'url';
import test from 'ava';
import createTwigRenderer from './createCodeRendererForMarked.mjs';


test('renders twig', (t) => {
    const twig = '<button>{{text}}</button>';
    const config = createTwigRenderer(res => res);
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
<div data-content hidden><pre><code class="html">&lt;button&gt;{{text}}&lt;/button&gt;</code></pre></div>
<div data-content><button>{{text}}</button></div>
</div>`);
});


test('renders other types of code', (t) => {
    const content = '<div>test</div>';
    const config = createTwigRenderer();
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
