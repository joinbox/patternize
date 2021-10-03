import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import test from 'ava';
import dirCompare from 'dir-compare';
import createDocumentation from './index.mjs';

test('creates expected documentation files', (t) => {

    const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
    const outPath = join(basePath, 'test-data/output');

    createDocumentation(
        join(basePath, 'test-data/input/base.yml'),
        outPath,
        true,
    );

    const { differences } = dirCompare.compareSync(
        outPath,
        join(basePath, 'test-data/expectation'),
        { compareContent: true },
    );
    t.is(differences, 0);

});

