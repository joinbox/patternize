import Twig from 'twig';
import adjustTwigImports from './adjustTwigImports.mjs';

/**
 * Renders a twig template (does not accept the injection of data as it must all be present in
 * a documentation MD)
 * @param {object.<string, string>} twigFunctions   Name of a twig function and corresponding
 *                                                  function (as string from YAML; will be evaled)
 * @param {object.<string, string>} twigFilters     Name of a twig filter and corresponding
 *                                                  function (as string from YAML; will be evaled)
 * @param {object.<string, string} twigNamespaces   Twig namespaces to use
 * @param {string} basePath                         Path from where possible includes should
 *                                                  be resolved
 * @returns {function}                              Returns a function that accepts the template;
 *                                                  this allows us to inject a preconfigured
 *                                                  twig parser where we need to.
 */
export default ({
    twigFunctions = {},
    twigFilters = {},
    twigNamespaces = {},
    basePath = '',
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
    // TODO: Inject paths from sources!
    const fakeData = {
        attribute: {
            getClasses: () => 'a b c',
        },
    };
    const result = parsedTemplate.render(fakeData);
    return result;
};
