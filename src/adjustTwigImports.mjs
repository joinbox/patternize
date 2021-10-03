import { join } from 'path';

/**
 * Adjusts import paths in Twig templates
 */
export default (content, basePath) => (
    // TODO: Multiple imports in [], see https://twig.symfony.com/doc/3.x/functions/include.html
    // TODO: Include functions are not yet supported  (https://github.com/twigjs/twig.js/issues/392)
    content.replace(
        // Backreferences don't work in character classes; that's why we cannot use
        // [^\2] to get all characters *but* the quote matched. Use a tempered
        // greey token instead: http://www.rexegg.com/regex-quantifiers.html#tempered_greed
        /(\{%\s*include\s+(["']))((?:(?!\2).)*)/g,
        (match, start, quote, middle) => ([
            start,
            join(basePath, middle),
        ].join('')),
    )
);
