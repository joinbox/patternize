import test from 'ava';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';


/**
 * Prepares default data for tests
 * @param {object} customFileContents   Object with file path as key and contents as value; will
 *                                      be merged with default values
 */
const setupData = ({ customFileContents, masterConfig = {} } = {}) => {
    const structure = [
        { data: 'First' },
        { data: 'file1.md' },
        {
            data: 'file2.md',
            children: [
                { data: 'file2-1.md' },
            ],
        },
    ];
    const entryYAMLFilePath = '/base/base.yml';
    const readFile = (name) => {
        const contents = {
            '/base/file1.md': `
                ---
                title: File 1 Title
                ...
                # File 1
            `,
            '/base/file2.md': `
                ---
                title: File 2 Title
                ...
                # File 2
            `,
            '/base/file2-1.md': `
                ---
                title: File 2-1 Title
                ...
                # File 2-1
            `,
        };
        return { ...contents, ...customFileContents }[name];
    };

    const result = parseYAMLBaseFile({
        structure,
        masterConfig,
        entryYAMLFilePath,
        readFile,
    });

    return {
        structure,
        masterConfig,
        entryYAMLFilePath,
        readFile,
        result,
    };
};


test('fails on invalid content', (t) => {

    const customFileContents = {
        '/base/file1.md': `
            ---
            title:
            - invalid
            - title
            - value
            ...
        `,
    };
    t.throws(() => setupData({ customFileContents }), {
        message: /Title property .* is object instead/,
    });
});


test('creates sourcePath and destinationPath properties', (t) => {
    const { result } = setupData();
    t.is(result.length, 4);

    // Entry that does not resolve to a file does not get paths
    t.is(Object.hasOwnProperty.call(result[0], 'sourcePath'), false);
    t.is(Object.hasOwnProperty.call(result[0], 'destinationPath'), false);

    // Destination path is created from title and path in menu structure
    t.is(result[3].sourcePath, '/base/file2-1.md');
    t.is(result[3].destinationPath, 'file-2-title/file-21-title');
});


test('reads files; keeps invalid paths as titles and uses titles from valid files', (t) => {
    const { result } = setupData();
    t.deepEqual(result.map(({ title }) => title), [
        'First',
        'File 1 Title',
        'File 2 Title',
        'File 2-1 Title',
    ]);
});


test('creates clean menu structure with active entry', (t) => {
    const { result } = setupData();
    t.deepEqual(result[0].menu, [{
        active: true,
        title: 'First',
    }, {
        destinationPath: 'file-1-title',
        title: 'File 1 Title',
    }, {
        destinationPath: 'file-2-title',
        title: 'File 2 Title',
    }]);
});



test('updates sources with source and destination properties', (t) => {
    const customFileContents = {
        '/base/file2.md': `
            ---
            title: Custom File 2
            sources:
              name: path/to/source
            ...
        `,
    };
    const { result } = setupData({ customFileContents });

    t.deepEqual(result[2].sources, {
        name: {
            source: '/base/path/to/source',
            destination: 'custom-file-2/path/to/source',
        },
    });
    // Sources are only copied once, therefore not inherited by descendants
    t.is(result[3].sources, undefined);
});


test('inherits certain fields', (t) => {
    const customFileContents = {
        '/base/file2.md': `
            ---
            title: Custom File 2
            scripts:
              - () => {}
            project: My Project
            twigFunctions:
              name: () => 'twigFunctionValue'
            twigFilters:
              name: () => 'twigFilterValue'
            twigNamespaces:
              icons: path/to/icons
            twigData: "{ attribute: 'a' }"
            ...
        `,
    };
    const { result } = setupData({ customFileContents });
    const fieldsToInherit = [
        'project',
        'twigFunctions',
        'twigFilters',
        'twigData',
        'scripts',
        'paths',
        'twigNamespaces',
    ];
    for (const field of fieldsToInherit) {
        t.deepEqual(result[3][field], result[2][field]);
    }

    // No unnecessary properties if they are not provided
    t.is(Object.hasOwnProperty.call(result[0], 'project'), false);
    t.is(Object.hasOwnProperty.call(result[0], 'twigFunctions'), false);
    t.is(Object.hasOwnProperty.call(result[0], 'twigFilters'), false);
    t.is(Object.hasOwnProperty.call(result[0], 'scripts'), false);

});

test('inherits styleSources and scriptSources, uses relative path', (t) => {
    const customFileContents = {
        '/base/file2.md': `
            ---
            title: Custom File 2
            scriptSources:
              - main.js
            styleSources:
              - main.css
            ...
        `,
    };
    // TODO: Make sure script does not fail when destinationPath is missing because (entry is
    // just a crossheading)
    const { result } = setupData({ customFileContents });
    // scriptSources
    t.deepEqual(result[2].scriptSources, ['main.js']);
    t.deepEqual(result[3].scriptSources, ['../main.js']);
    // styleSources
    t.deepEqual(result[2].styleSources, ['main.css']);
    t.deepEqual(result[3].styleSources, ['../main.css']);

    // No unnecessary items
    t.is(Object.hasOwnProperty.call(result[0], 'scriptSources'), false);
    t.is(Object.hasOwnProperty.call(result[0], 'styleSources'), false);
});


test('adds path properties to all descendants of sources', (t) => {
    const customFileContents = {
        '/base/file2.md': `
            ---
            title: Custom File 2
            sources:
              name: path/to/source
            ...
        `,
    };
    const { result } = setupData({ customFileContents });
    t.deepEqual(result[2].paths, {
        name: 'path/to/source',
    });
    // Path is inherited by child entries and relative to their path
    t.deepEqual(result[3].paths, {
        name: '../path/to/source',
    });
});


test('inherits from masterConfig', (t) => {
    const masterConfig = {
        project: 'My Project',
        twigFilters: {
            filterName: () => 'twigFilterValue',
        },
        sources: {
            sourceName: 'path/to/source',
        },
    };
    const { result } = setupData({ masterConfig });
    // Only test if properties were inherited by first entry; others will be the same
    t.is(result[0].project, 'My Project');
    t.is(typeof result[0].twigFilters.filterName, 'function');
    t.deepEqual(result[0].paths, { sourceName: 'path/to/source' });
});
