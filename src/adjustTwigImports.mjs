import { join } from 'path';

/**
 * Adjusts import paths in Twig templates
 */
export default (content, basePath) => (
    // TODO: Multiple imports in [], see https://twig.symfony.com/doc/3.x/functions/include.html
    // TODO: Include functions are not yet supported  (https://github.com/twigjs/twig.js/issues/392)
    // TODO: Same delimiter at the end as at the beginning (' or "")
    content.replace(
        /(\{%\s*include\s+["'])([^"]+)(["'])/g,
        (match, start, middle, end) => ([
            start,
            join(basePath, middle),
            end,
        ].join('')),
    )
);
