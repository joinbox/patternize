import test from 'ava';
import escapeHTML from './escapeHTML.mjs';

test('escapes HTML', (t) => {
    t.is(
        escapeHTML(`'yes', <a href="a=b&c=d">he</a> said`),
        '&#039;yes&#039;, &lt;a href=&quot;a=b&amp;c=d&quot;&gt;he&lt;/a&gt; said',
    );
});