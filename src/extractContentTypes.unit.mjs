import test from 'ava';
import extractContentTypes from './extractContentTypes.mjs';

test('extracts yaml and md', (t) => {
    const data = `
---
yaml
---
md
`;
    const { md, yaml } = extractContentTypes(data);
    // New lines are difficult to test and don't matter for YAML/MD; accept any
    t.is(/^\n*md\n*$/.test(md), true);
    t.is(/^\n*yaml\n*$/.test(yaml), true);
});


test('works with missing yaml', (t) => {
    const data = `
--
yaml
---
md
`;
    const { md, yaml } = extractContentTypes(data);
    // New lines are difficult to test and don't matter for YAML/MD; accept any
    t.is(md, data);
    t.is(yaml, null);
});
