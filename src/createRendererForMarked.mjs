import escapeHTML from './escapeHTML.mjs';

/**
 * Returns a renderer configuration that works with marked; it renders code blocks that contain
 * Twig content including a preview (HTML and rendered content).
 * @param {function} renderTwig     A function that twig template can be passed to and returns the
 *                                  rendered HTML content
 * @returns {object}                An object with a code property that can be used as a marked
 *                                  renderer
 */
export default (renderTwig) => ({
    // We might want to use a template engine here; but let's keep things simple to not nest
    // a template engine within a template that will be rendered by a template engine …
    code(content, infoString) {

        // Content must follow code tag directly or it will indent unnecessarily
        const renderedRawCode = `<pre><code class="language-${infoString}">${escapeHTML(content)}</code></pre>`;

        const code = [];
        // Start a code block by marking it with data-code
        code.push('<div data-code>');
        // Use bulma classes
        code.push('<div class="tabs is-right is-small is-boxed">');
        code.push('<ul>');

        // Twig Code
        if (infoString === 'twig') {
            const parsedTwig = renderTwig(content, null);
            code.push('<li data-tab><a>Twig</a></li>');
            code.push('<li data-tab><a>HTML</a></li>');
            code.push('<li class="is-active" data-tab><a>Rendered</a></li>');
            code.push('</ul>');
            code.push('</div>');
            code.push(`<div data-content hidden>${renderedRawCode}</div>`);
            code.push('<div data-content hidden><pre><code class="html">');
            code.push(escapeHTML(parsedTwig));
            code.push('</code></pre></div>');
            code.push(`<div data-content class="preview-container">${parsedTwig}</div>`);
        } else {
            // Unknown type of code (no special treatment will be applied); <a> is necessary for
            // correct styling by bulma
            code.push('<li class="is-active"><a>Original (Unknown Type)</a></li>');
            code.push('</ul>');
            code.push('</div>');
            code.push(`<div data-content>${renderedRawCode}</div>`);
        }

        code.push('</div>');
        return code.join('\n');

    },

    // Basic styles (headings etc.) to be styled with bulma / custom CSS (where bulma is missing
    // styles). There is no negative ancestor selector (with selectors 3) which would enable us
    // to exclude elements within code/demo blocks, therefore we have to use positive selectors.
    heading(text, level) {
        return `<h${level} class="title is-${level}">${text}</h${level}>`;
    },
    paragraph(text) {
        return `<p class="paragraph">${text}</p>`;
    },
    list(body, ordered, start) {
        const tag = ordered ? 'ol' : 'ul';
        return `
            <${tag} class="list" start="${start}">
                ${body}
            </${tag}>
        `;
    },
});
