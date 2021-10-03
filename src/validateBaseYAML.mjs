import validateCommonProperties from './validateCommonProperties.mjs';

export default (yaml) => {

    // Structure
    if (typeof yaml.structure !== 'object' || yaml.structure === null) {
        throw new Error(`validateBaseYAML: Expected structure property to be an object, is ${yaml.structure} instead.`);
    }

    // Project name
    if (typeof yaml.project !== 'string') {
        throw new Error(`validateBaseYAML: Expected property project is not a string but ${yaml.project}.`);
    }

    validateCommonProperties(yaml);

};
