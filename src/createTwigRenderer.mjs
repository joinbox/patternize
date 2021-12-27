import { readFileSync } from 'fs';
import Twig from './lib/twig.js';
import adjustTwigImports from './adjustTwigImports.mjs';

/**
 * Renders a twig template (does not accept the injection of data as it must all be present in
 * a documentation MD)
 * @param {object.<string, string>} twigFunctions   Name of a twig function and corresponding
 *                                                  function (as string from YAML; will be evaled)
 * @param {object.<string, string>} twigFilters     Name of a twig filter and corresponding
 *                                                  function (as string from YAML; will be evaled)
 * @param {object.<string, string>} twigNamespaces  Twig namespaces to use
 * @param {string} basePath                         Path from where possible includes should
 *                                                  be resolved
 * @param {object.<string, string>} paths           Paths property to access files that were copied
 *                                                  to destination.
 * @param {object.<string, *>} data                 Data property that are passed to twig
 *                                                  renderer; can contain anything (e.g. function,
 *                                                  string etc.)
 * @returns {function}                              Returns a function that accepts the template;
 *                                                  this allows us to inject a preconfigured
 *                                                  twig parser where we need to.
 */
export default ({
    twigFunctions = {},
    twigFilters = {},
    twigNamespaces = {},
    basePath = '',
    paths = {},
    data = {},
} = {}) => (template) => {

    // Add twig functions
    for (const [name, fn] of Object.entries(twigFunctions)) {
        Twig.extendFunction(name, eval(fn)); // eslint-disable-line no-eval
    }

    // Add twig filters
    for (const [name, fn] of Object.entries(twigFilters)) {
        Twig.extendFilter(name, eval(fn)); // eslint-disable-line no-eval
    }

    // source does not work with twig namespaces. Fix/overwrite the source function to support
    // namespaces. See https://github.com/twigjs/twig.js/issues/442. extendFunction does not work
    // here, it will not be called.
    // TODO: Add support for arguments (ignore_missing)
    Twig.extendFunction('source', (src) => {
        let adjustedSource = src;
        // Test if src contains a namespace; if it does, replace it with the corresponding path
        const namespace = /^@([a-z]+[^/]+)/g.exec(src);
        if (namespace) {
            if (!twigNamespaces[namespace[1]]) {
                console.warn('Namespace %s not found in %o', namespace[1], twigNamespaces);
            }
            adjustedSource = adjustedSource.replace(namespace[0], twigNamespaces[namespace[1]]);
        }
        try {
            return readFileSync(adjustedSource, 'utf8');
        } catch (err) {
            console.warn('Could not read file %s that was included via source tag', adjustedSource);
            return `source: File ${src} not found`;
        }
    });

    const { twig } = Twig;

    // Adjust paths in all import tags (they need to be relative to the original document,
    // not the current environment)
    const templateWithAdjustedPaths = adjustTwigImports(template, basePath);
    const parsedTemplate = twig({
        allowInlineIncludes: true,
        namespaces: twigNamespaces,
        data: templateWithAdjustedPaths,
    });
    const result = parsedTemplate.render({ paths, data });
    return result;
};
