import test from 'ava';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';


/**
 * Prepares default data for tests
 * @param {object} customFileContents   Object with file path as key and contents as value; will
 *                                      be merged with default values
 */
const setupData = ({ customFileContents, masterConfig = { project: 'Project Name' } } = {}) => {
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
    t.is(result.length, 5);

    // Entry that does not resolve to a file does not get paths
    t.is(Object.hasOwnProperty.call(result[1], 'sourcePath'), false);
    t.is(Object.hasOwnProperty.call(result[1], 'destinationPath'), false);

    // Destination path is created from title and path in menu structure
    t.is(result[4].sourcePath, '/base/file2-1.md');
    t.is(result[4].destinationPath, 'project-name/file-2-title/file-21-title');
});


test('reads files; keeps invalid paths as titles and uses titles from valid files', (t) => {
    const { result } = setupData();
    t.deepEqual(result.map(({ title }) => title), [
        'Project Name',
        'First',
        'File 1 Title',
        'File 2 Title',
        'File 2-1 Title',
    ]);
});


test('creates clean menu structure with active entry', (t) => {
    const { result } = setupData();
    t.deepEqual(result[1].menu, [{
        active: true,
        title: 'First',
    }, {
        destinationPath: 'project-name/file-1-title',
        title: 'File 1 Title',
    }, {
        destinationPath: 'project-name/file-2-title',
        title: 'File 2 Title',
    }]);
});



test('updates sources with source and destination properties', (t) => {
    const customFileContents = {
        '/base/file2.md': `
            ---
            title: Custom File 2
            sources:
              name: path/to/source-2
            ...
        `,
    };
    const { result } = setupData({ customFileContents });

    t.deepEqual(result[3].sources, {
        name: {
            source: '/base/path/to/source-2',
            destination: 'project-name/custom-file-2/path/to/source-2',
        },
    });
    // Sources are only copied once, therefore not inherited by descendants
    t.is(result[4].sources, undefined);
});


test('adds anceestors\' path to source\'s destination', (t) => {
    const customFileContents = {
        '/base/file2-1.md': `
            ---
            title: Custom File 2-1
            sources:
              name: path/to/source-2-1
            ...
        `,
    };
    const { result } = setupData({ customFileContents });

    // Adds parent's element's path to source's destination
    t.deepEqual(result[4].sources, {
        name: {
            source: '/base/path/to/source-2-1',
            destination: 'project-name/file-2-title/custom-file-21/path/to/source-2-1',
        },
    });
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
        t.deepEqual(result[4][field], result[3][field]);
    }

    // No unnecessary properties if they are not provided
    t.is(Object.hasOwnProperty.call(result[1], 'twigFunctions'), false);
    t.is(Object.hasOwnProperty.call(result[1], 'twigFilters'), false);
    t.is(Object.hasOwnProperty.call(result[1], 'scripts'), false);

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
    t.deepEqual(result[3].scriptSources, ['main.js']);
    t.deepEqual(result[4].scriptSources, ['../main.js']);
    // styleSources
    t.deepEqual(result[3].styleSources, ['main.css']);
    t.deepEqual(result[4].styleSources, ['../main.css']);

    // No unnecessary items
    t.is(Object.hasOwnProperty.call(result[1], 'scriptSources'), false);
    t.is(Object.hasOwnProperty.call(result[1], 'styleSources'), false);
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
    t.deepEqual(result[3].paths, {
        name: 'path/to/source',
    });
    // Path is inherited by child entries and relative to their path
    t.deepEqual(result[4].paths, {
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
            sourceIdentifier: 'path/to/source',
        },
        scriptSources: [
            'path/to/source/main.js',
        ],
    };
    const { result } = setupData({ masterConfig });
    // Only test if properties were inherited by first entry; others will be the same
    t.is(result[1].project, 'My Project');
    t.is(typeof result[1].twigFilters.filterName, 'function');
    t.deepEqual(result[1].paths, { sourceIdentifier: 'my-project/path/to/source' });
    t.deepEqual(result[1].scriptSources, ['my-project/path/to/source/main.js']);
});


test('uses correct paths for masterConfig', (t) => {
    const masterConfig = {
        project: 'My Project',
        sources: {
            sourceIdentifier: 'path/to/source',
        },
    };
    const { result } = setupData({ masterConfig });
    // Only test if properties were inherited by first entry; others will be the same
    t.deepEqual(result[0].sources, {
        sourceIdentifier: {
            source: '/base/path/to/source',
            destination: 'my-project/path/to/source',
        },
    });

});


test('adds relative path to root directory', (t) => {
    const { result } = setupData();
    t.is(result[0].relativePathToRootDirectory, '..');
    // Child (file1)
    t.is(result[2].relativePathToRootDirectory, '../..');
    t.is(result[4].relativePathToRootDirectory, '../../..');
});
