import test from 'ava';
import extractTitle from './extractTitle.mjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

test('extracts title', (t) => {
    const invalidPath = join(basePath, 'inexistent.md');
    t.is(extractTitle(invalidPath), null);
    t.is(extractTitle(join(basePath, 'test-data/input/welcome.md')), 'Home');
});
