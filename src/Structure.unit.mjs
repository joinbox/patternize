import test from 'ava';
import Structure from './Structure.mjs';

test('returns Structure instance on map', (t) => {
    const original = [{
        name: 'a',
    }, {
        name: 'b',
        children: [{
            name: 'b.a',
            children: [{
                name: 'b.a.a',
            }],
        }],
    }];
    const structure = new Structure(original);
    const result = structure.map((item) => ({
        name: `new-${item.name}`,
    }));
    // Original was not modified
    t.deepEqual(structure.data, original);
    t.is(result instanceof Structure, true);
    t.deepEqual(result.data, [
        {
            name: 'new-a',
        }, {
            name: 'new-b',
            children: [{
                name: 'new-b.a',
                children: [{
                    name: 'new-b.a.a',
                }],
            }],
        },
    ]);
});


