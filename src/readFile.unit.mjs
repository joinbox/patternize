import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import test from 'ava';
import readFile from './readFile.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

test('reads file', (t) => {
    const filePath = join(basePath, './test-data/input/base.yml');
    const content = readFile(filePath);
    t.is(content, readFileSync(filePath, 'utf8'));
});

test('works with inexisting file', (t) => {
    const content = readFile(join(basePath, 'nope'));
    t.is(content, null);
});