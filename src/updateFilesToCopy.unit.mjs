import test from 'ava'
import updateFilesToCopy from './updateFilesToCopy.mjs';

test('copies and updates properties', (t) => {
    const original = {
        scripts: ['a', 'b'],
        styles: ['c'],
        other: ['e', 'f'],
    };
    const result = updateFilesToCopy(original, ['scripts', 'styles'], '', 'prefix');
    t.deepEqual(result, {
        scripts: [['a', 'prefix/a'], ['b', 'prefix/b']],
        styles: [['c', 'prefix/c']],
        other: ['e', 'f'],
    });
});

test('clones original object', (t) => {
    const original = {
        scripts: ['a'],
        styles: ['c'],
    };
    const result = updateFilesToCopy(original, ['scripts'], '', 'prefix');
    t.is(result.styles[0], 'c');
});

test('respects source path', (t) => {
    const original = {
        scripts: ['a'],
        styles: ['c'],
    };
    const result = updateFilesToCopy(original, ['scripts', 'styles'], 'src', 'prefix');
    t.deepEqual(result, {
        scripts: [['src/a', 'prefix/a']],
        styles: [['src/c', 'prefix/c']],
    });
});
