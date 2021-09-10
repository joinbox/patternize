import { join, dirname } from 'path';
import { writeFileSync, mkdirSync, rmdirSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import renderPage from './renderPage.mjs';
import convertMDToHTML from './convertMDToHTML.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const outPath = join(basePath, 'test-data/output');
rmdirSync(outPath, { recursive: true });

const yamlFilePath = join(basePath, 'test-data/input/base.yml');


// Convert raw YAML data of entry file to data that can be used to create documentation (including
// menu structure, YAML and MD of linked files etc.)
const entries = parseYAMLBaseFile(yamlFilePath);


// Convert MD in every entry to HTML
const entriesWithParsedMD = entries.map((item) => {
    const html = convertMDToHTML(item, dirname(yamlFilePath));
    return {
        ...item,
        ...(html ? { html } : {}),
    };
});


// Add template, write to file system
for (const entry of entriesWithParsedMD) {
    // If entry has no destination, there's nowhere we could write the result too. This is a
    // menu item without a link/page, ignore it.
    if (!entry.destinationPath) continue;
    const rendered = renderPage(entry);
    mkdirSync(join(outPath, entry.destinationPath), { recursive: true });
    writeFileSync(join(outPath, entry.destinationPath, 'index.html'), rendered);
    if (entry.yaml) {
        console.log('yaml', entry.yaml);
        // Copy scripts to output directory
        for (const [source, destination] of entry.yaml.scripts) {
            copyFileSync(
                join(dirname(yamlFilePath), dirname(entry.sourcePath), source),
                join(outPath, destination),
            );
        }
        // Copy styles to output directory
        for (const [source, destination] of entry.yaml.styles) {
            copyFileSync(
                join(dirname(yamlFilePath), dirname(entry.sourcePath), source),
                join(outPath, destination),
            );
        }
    }
    console.log(rendered);
}
