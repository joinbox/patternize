import { join, dirname } from 'path';
import {
    writeFileSync,
    mkdirSync,
    rmdirSync,
    copyFileSync,
    readdirSync,
} from 'fs';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import renderPage from './renderPage.mjs';
import convertMDToHTML from './convertMDToHTML.mjs';
import createIndexRedirect from './createIndexRedirect.mjs';

/**
 * Creates documentation from baseFilePath and saves it in outputPath
 * @param {string} entryFilePath            Absolute path to entry YAM file
 * @param {string} outputPath               Absolute path to directory where the documentation's
 *                                          static HTML files should be stored
 * @param {boolean} forceOuputPathRemoval   True if removal of all content of outputPath should be
 *                                          forced
 */
export default (entryFilePath, outputPath, forceOuputPathRemoval) => {

    if (readdirSync(outputPath).length && !forceOuputPathRemoval) {
        console.error(`index.mjs: outputPath ${outputPath} contains files: ${readdirSync(outputPath).join(', ')}; remove them or use force option to have them removed before you continue`);
        return;
    }

    rmdirSync(outputPath, { recursive: true });

    // Convert raw YAML data of entry file to data that can be used to create documentation
    // (including menu structure, YAML and MD of linked files etc.)
    const entries = parseYAMLBaseFile(entryFilePath);


    // Convert MD in every entry to HTML
    const entriesWithParsedMD = entries.map((item) => {
        const html = convertMDToHTML(item, dirname(entryFilePath));
        return {
            ...item,
            ...(html ? { html } : {}),
        };
    });


    // Load template, fill with values, write to file system
    for (const entry of entriesWithParsedMD) {
        // If entry has no destination, there's nowhere we could write the result too. This is a
        // menu item without a link/page, ignore it.
        if (!entry.destinationPath) continue;
        const rendered = renderPage({ data: entry, templatePath: './templates/page.twig' });
        mkdirSync(join(outputPath, entry.destinationPath), { recursive: true });
        writeFileSync(join(outputPath, entry.destinationPath, 'index.html'), rendered);
        if (entry.yaml) {
            // Copy scripts and tyles to output directory
            for (const [source, destination] of [...entry.yaml.scripts, ...entry.yaml.styles]) {
                copyFileSync(
                    join(dirname(entryFilePath), dirname(entry.sourcePath), source),
                    join(outputPath, destination),
                );
            }
        }
    }


    // Create redirect from home directory to first entry in menu
    const firstEntryWithDestination = entriesWithParsedMD.find((item) => !!item.destinationPath);
    if (firstEntryWithDestination) {
        const redirectFile = createIndexRedirect({
            destination: firstEntryWithDestination.destinationPath,
            templatePath: './templates/home.twig',
        });
        writeFileSync(join(outputPath, 'index.html'), redirectFile);
    }

};
