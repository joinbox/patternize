import { exec } from 'child_process';
import test from 'ava';

test('provides an executable', async(t) => {

    let resolvePromise;
    const promise = new Promise((resolve) => {
        resolvePromise = resolve;
    });

    exec('node . -i ./test-data/input/base.yml -o ./test-data/output -f', (error, stdout, stderr) => {
        t.is(stdout, '');
        t.is(error, null);
        t.is(stderr, '');
        resolvePromise();
    });

    return promise;

});
