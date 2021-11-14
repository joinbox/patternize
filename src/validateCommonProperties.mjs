import validatePaths from './validatePaths.mjs';

/**
 * Validates common properties between base YAML file and YAML in MD files that document a single
 * component
 */
export default (config) => {

    // Twig functions, filters, namespaces
    const twigProperties = ['twigFunctions', 'twigFilters', 'twigNamespaces'];
    for (const property of twigProperties) {
        // Twig properties are optional
        if (Object.hasOwnProperty.call(config, property)) {
            const value = config[property];
            if (typeof value !== 'object' || value === null) {
                throw new Error(`validateCommonProperties: Optional property ${property} is expected to be an object, is ${value} instead.`);
            }
            for (const [childProperty, childValue] of Object.entries(value)) {
                if (typeof childProperty !== 'string' || typeof childValue !== 'string') {
                    throw new Error(`validateCommonProperties: Key and value of an entry in ${property} are expected to be strings, got ${childProperty}:${childValue} instead.`);
                }
            }
        }
    }

    // Script (for JavaScript that will be executed directly within the documentation page)
    if (Object.hasOwnProperty.call(config, 'scripts')) {
        if (!Array.isArray(config.scripts)) {
            throw new Error(`validateCommonProperties: If you use a scripts property, it must be an array, is ${config.scripts} instead.`);
        }
        const invalidScripts = config.scripts?.filter((script) => typeof script !== 'string');
        if (invalidScripts.length) {
            throw new Error(`validateCommonProperties: All script items must be strings; you passed the following invalid values ${JSON.stringify(invalidScripts)}.`);
        }
    }


    // Scripts and styles
    validatePaths(config, ['scriptSources']);
    validatePaths(config, ['styleSources']);

};
