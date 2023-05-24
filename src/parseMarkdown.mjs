import { marked } from 'marked';

/**
 * Parses MD, returns HTML.
 * @param {string} markdown
 * @param {function[]} renderers        Renderers (see https://marked.js.org/using_pro#renderer);
 *                                      will be called in the order provided.
 */
export default ({ markdown, renderers = [] } = {}) => {
    marked.use({ mangle: false, headerIds: false });
    renderers.forEach((renderer) => marked.use({ renderer }));
    return marked.parse(markdown);
};
