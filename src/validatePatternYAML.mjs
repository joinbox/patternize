export default (yaml) => {

    if (typeof yaml.structure !== 'object' || yaml.structure === null) {
        throw new Error(`ValidatePatternYAML: Expected structure property to be an object, is ${yaml.structure} instead.`);
    }


};
