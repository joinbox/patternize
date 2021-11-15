import { dirname } from 'path';
import parseMarkdown from './parseMarkdown.mjs';
import createTwigRenderer from './createTwigRenderer.mjs';
import createRendererForMarked from './createRendererForMarked.mjs';

/**
 * Converts a MD property to HTML
 */
export default (item) => {
    let htmlContent;
    // If there's MD content, there's also a source path; convert it to HTML
    if (item.md) {
        // Use current item's config (from YAML) file to create specific twig renderer
        const renderTwig = createTwigRenderer({
            twigFilters: item.twigFilters ?? {},
            twigFunctions: item.twigFunctions ?? {},
            twigNamespaces: item.twigNamespaces ?? {},
            // Base of basePath is the YAML file, adjusted for the sourcePath of the current item
            basePath: dirname(item.sourcePath),
        });
        const codeRenderer = createRendererForMarked(renderTwig);
        htmlContent = parseMarkdown({
            markdown: item.md,
            renderers: [codeRenderer],
        });

    }
    return htmlContent;
};
