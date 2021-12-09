import test from 'ava';
import removeHiddenEntriesFromMenu from './removeHiddenEntriesFromMenu.mjs';

test('works if children property is missing', (t) => {
    const data = [{
        showInMenu: false,
    }];
    const result = removeHiddenEntriesFromMenu(data);
    t.deepEqual(result, []);
});

test('removes elements with showInMenu:false', (t) => {
    const data = [{
        name: 'stay-1',
    }, {
        name: 'go',
        showInMenu: false,
        children: [{
            name: 'stay-2',
        }],
    }];
    const result = removeHiddenEntriesFromMenu(data);
    t.deepEqual(result, [{
        name: 'stay-1',
    }, {
        name: 'stay-2',
    }]);
});

