import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import expectation from './parseYAMLBaseFile.expectation.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const yamlFilePath = join(basePath, 'test-data/input/base.yml');

test('parses yaml base file', (t) => {
    const result = parseYAMLBaseFile(yamlFilePath);
    // console.log('expct', JSON.stringify(result, null, 2));
    t.deepEqual(result, expectation);
});

