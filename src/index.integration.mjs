import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import test from 'ava';
import dirCompare from 'dir-compare';
import createDocumentation from './index.mjs';

test('creates expected documentation files', async(t) => {

    const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
    const outPath = join(basePath, 'test-data/output');

    await createDocumentation({
        entryFilePath: join(basePath, 'test-data/input/base.yml'),
        outputDirectoryPath: outPath,
        forceEmptyOutputDirectory: true,
    });

    const { differences } = dirCompare.compareSync(
        outPath,
        join(basePath, 'test-data/expectation'),
        { compareContent: true },
    );
    t.is(differences, 0);

});

