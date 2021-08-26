import { load } from 'js-yaml';

/**
 * Parses and returns YAML
 */
export default content => load(content);