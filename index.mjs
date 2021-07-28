import { readFileSync, writeFileSync } from 'fs';
import marked from 'marked';
import { load } from 'js-yaml';
import { join, dirname } from 'path';
import Twig from 'twig';


// Parse file
const readFile = (path) => {
    return readFileSync(path, 'utf8');
}

const splitFileIntoMDAndYAML = (content) => {
    const match = /(?:^|\r|\n)-{3}[\r\n].*-{3}(?:\r|\n|$)/s.exec(content);
    const yaml = match.length ? match[0].replace(/-{3}/g, '') : '';
    const md = match.length ? content.replace(match, '') : content;
    return { yaml, md};
}

const parseYAML = (yaml) => {
    return load(yaml);
}

const parseMarkdown = (markdown, sourceFile, twigFunctions) => {
    console.log('pmd', sourceFile);
    const renderer = {
        code(content, infostring) {
            // Content must follow tag directly or it will indent unnecessarily
            const code = [
                `
                    <h4>TWIG</h4>
                    <pre><code class="language-${infostring}">${escapeHTML(content)}</code></pre>
                `,
            ];
            if (infostring === 'twig') {
                const parsedTwig = parseTwig(content, null, sourceFile, twigFunctions);
                code.push(`
                    <h4>HTML</h4>
                    <pre><code>${escapeHTML(parsedTwig)}</code></pre>
                `);
                code.push(`
                    <h4>RENDERED</h4>
                    <div class="rendered">
                    ${parsedTwig}
                    </div>
                `)
            }
            console.log('code', code);
            return code.join('\n');
        }
    }
    marked.use({ renderer });
    return marked(markdown);
}

const parseTwig = (template, data, sourceFile, twigFunctions) => {
    console.log('twigggg', template, sourceFile);
    for (const [name, fn] of Object.entries(twigFunctions)) {
        Twig.extendFunction(name, eval(fn));
    }
    // TODO: Solve correctly
    Twig.extendFilter('t', value => value);
    // TODO: Replace @icon with 'src/media/icons/'
    const { twig } = Twig;
    const templateWithAdjustedPaths = replacePathInTwig(template, sourceFile);
    const parsedTemplate = twig({
        allowInlineIncludes: true,
        namespaces: {
            icons: '/Users/fs/Sites/bm/web/themes/custom/bm/dist/icons',
            components: '/Users/fs/Sites/bm/web/themes/custom/bm/template-library/components',
        },
        data: templateWithAdjustedPaths,
    });
    const result = parsedTemplate.render(data);
    console.log('resulttt', result);
    return result;
}

const replacePathInTwig = (content, basePath) => {
    return content.replace(/(include ")([^"]+)(")/g, (match, start, middle, end) => {
        return [
            start,
            join(dirname(basePath), middle),
            end,
        ].join('');
    });
}

const escapeHTML = (content) => {
    // Quick & dirty: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/18108463
    return content
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;');
}

const parseFile = ({ source, target } = {}) => {
    const content = readFile(source);
    const { md, yaml } = splitFileIntoMDAndYAML(content);
    const parsedYAML = parseYAML(yaml);
    const parsedMarkdown = parseMarkdown(md, source, parsedYAML.twigFunctions);
    console.log('parsed md', parsedMarkdown, 'parsed yaml', parsedYAML);

    const html = [
        '<html><head>',
        `<base href="${parsedYAML.base}">`,
        ...parsedYAML.styles.map(src => `<link href="${src}" rel="stylesheet">`),
        `<style>${readFileSync('./main.css')}</style>`,
        '</head><body>',
        parsedMarkdown,
        ...parsedYAML.scripts.map(src => `<script src="${src}"`),
        '</body></html>',
    ];
    
    writeFileSync(join(target, `${parsedYAML.name}.html`), html.join('\n'));
}

// parseFile({
//     source: '../bm/web/themes/custom/bm/template-library/components/button/c-button.md',
//     target: './output',
// });
parseFile({
    source: '../bm/web/themes/custom/bm/template-library/components/navigation/c-navigation.md',
    target: './output',
});
