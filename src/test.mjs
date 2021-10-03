import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import createDocumentation from './index.mjs';

/**
 * For testing purposes: Creates documentation from ./test-data/input and saves it to
 * ./test-data/output
 * You might also use the command line
 * node src/executable.mjs -i src/test-data/input/base.yml -o src/test-data/output -f
 */
const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
createDocumentation(
    join(basePath, 'test-data/input/base.yml'),
    join(basePath, 'test-data/output'),
    true,
);
