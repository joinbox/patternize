import { join, dirname } from 'path';
import parseMarkdown from './parseMarkdown.mjs';
import createTwigRenderer from './createTwigRenderer.mjs';
import createCodeRendererForMarked from './createCodeRendererForMarked.mjs';

/**
 * Converts a MD property to HTML
 */
export default (item, yamlBaseFilePath) => {
    let htmlContent;
    // If there's MD content, there's also a source path; convert it to HTML
    if (item.md) {
        // Use current item's config (from YAML) file to create specific twig renderer
        const renderTwig = createTwigRenderer({
            twigFilters: item.yaml?.twigFilters,
            twigFunctions: item.yaml?.twigFunctions,
            twigNamespaces: item.yaml?.twigNamespaces,
            // Base of basePath is the YAML file, adjusted for the sourcePath of the current item
            basePath: join(yamlBaseFilePath, dirname(item.sourcePath)),
        });
        const codeRenderer = createCodeRendererForMarked(renderTwig);
        htmlContent = parseMarkdown({
            markdown: item.md,
            renderers: [codeRenderer],
        });
    }
    return htmlContent;
};
