import validatePaths from './validatePaths.mjs';

export default (yaml) => {

    // Structure
    if (typeof yaml.structure !== 'object' || yaml.structure === null) {
        throw new Error(`ValidatePatternYAML: Expected structure property to be an object, is ${yaml.structure} instead.`);
    }

    // Scripts and styles
    validatePaths(yaml, ['scripts']);
    validatePaths(yaml, ['styles']);

};
