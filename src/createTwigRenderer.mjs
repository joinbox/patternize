import Twig from 'twig';
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
