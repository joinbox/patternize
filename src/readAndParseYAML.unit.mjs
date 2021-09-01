import test from 'ava';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import readAndParseYAML from './readAndParseYAML.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const testFilePath = join(basePath, 'test-data/input/base.yml');

test('reads YAML', (t) => {
    const result = readAndParseYAML(testFilePath);
    t.is(typeof result, 'object');
    // Check nested structures
    t.is(result.structure.length, 5);
});
