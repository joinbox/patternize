import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import expectation from './parseYAMLBaseFile.expectation.mjs';
import generateMenuStructure from './generateMenuStructure.mjs';
import readAndParseYAML from './readAndParseYAML.mjs';
import readFile from './readFile.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const yamlFilePath = join(basePath, 'test-data/input/base.yml');

test('parses yaml base file', (t) => {

    const yaml = readAndParseYAML(yamlFilePath);
    const { structure, ...masterConfig } = yaml;
    const menuStructure = generateMenuStructure(structure);

    const result = parseYAMLBaseFile({
        structure: menuStructure,
        masterConfig,
        entryYAMLFilePath: yamlFilePath,
        readFile,
    });
    // console.log('expct', JSON.stringify(result, null, 2));
    t.deepEqual(result, expectation);
});

