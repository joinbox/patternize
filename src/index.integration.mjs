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

    const result = dirCompare.compareSync(
        outPath,
        join(basePath, 'test-data/expectation'),
        { compareContent: true },
    );
    const { differences } = result;
    if (differences !== 0) {
        console.log('Differences');
        console.log(result.diffSet);
    }
    t.is(differences, 0);

});

