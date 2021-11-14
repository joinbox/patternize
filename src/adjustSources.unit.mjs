import test from 'ava';
import adjustSources from './adjustSources.mjs';

test('adjusts sources and creates paths', (t) => {
    const item = {
        sources: {
            sourceName: 'assets',
        },
        destinationPath: '/output/',
        sourcePath: '/input/base.yaml',
    };
    const result = adjustSources(item);
    t.deepEqual(result, {
        sources: {
            sourceName: {
                source: '/input/assets',
                destination: '/output/assets',
            },
        },
        paths: {
            sourceName: '/output/assets',
        },
        destinationPath: item.destinationPath,
        sourcePath: item.sourcePath,
    });
});

test('does not fail if properties are not present', (t) => {
    const item = {};
    const result = adjustSources(item);
    t.deepEqual(item, result);
});
