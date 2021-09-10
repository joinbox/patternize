import test from 'ava';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import expectation from './parseYAMLBaseFile.expectation.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const yamlFilePath = join(basePath, 'test-data/input/base.yml');

test('parses yaml base file', (t) => {
    const result = parseYAMLBaseFile(yamlFilePath);
    console.log(JSON.stringify(result, null, 2));
    t.deepEqual(result, expectation);
});

