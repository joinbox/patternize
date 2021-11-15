import { join, dirname } from 'path';
import {
    writeFileSync,
    mkdirSync,
    rmdirSync,
    statSync,
    readdirSync,
} from 'fs';
import fsExtra from 'fs-extra';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import renderPage from './renderPage.mjs';
import convertMDToHTML from './convertMDToHTML.mjs';
import createIndexRedirect from './createIndexRedirect.mjs';
import readAndParseYAML from './readAndParseYAML.mjs';
import readFile from './readFile.mjs';
import validateBaseYAML from './validateBaseYAML.mjs';
import generateMenuStructure from './generateMenuStructure.mjs';

/**
 * Creates documentation from baseFilePath and saves it in outputPath
 * @param {string} entryFilePath            Absolute path to entry YAM file
 * @param {string} outputPath               Absolute path to directory where the documentation's
 *                                          static HTML files should be stored
 * @param {boolean} forceOuputPathRemoval   True if removal of all content of outputPath should be
 *                                          forced
 */
export default async({ entryFilePath, outputDirectoryPath, forceEmptyOutputDirectory }) => {

    if (readdirSync(outputDirectoryPath).length && !forceEmptyOutputDirectory) {
        console.error(`index.mjs: outputPath ${outputDirectoryPath} contains files: ${readdirSync(outputDirectoryPath).join(', ')}; remove them or use force option to have them removed before you continue`);
        return;
    }

    // Check if relevant files exist and provide human readable error messages
    try {
        statSync(entryFilePath);
    } catch (err) {
        console.error(`index.mjs: File for entryFilePath ${entryFilePath} does not exist.`);
        return;
    }

    try {
        statSync(outputDirectoryPath);
    } catch (err) {
        console.error(`index.mjs: Directory for outputDirectoryPath ${outputDirectoryPath} does not exist.`);
        return;
    }

    rmdirSync(outputDirectoryPath, { recursive: true });
    mkdirSync(outputDirectoryPath);

    const baseFileYAML = readAndParseYAML(entryFilePath);
    validateBaseYAML(baseFileYAML);
    // Convert pure YAML array to nexted array with children: { data: 'name', children: [] }
    const structuredData = generateMenuStructure(baseFileYAML.structure);


    // Convert raw YAML data of entry file to data that can be used to create documentation
    // (including menu structure, YAML and MD of linked files etc.)
    const structure = parseYAMLBaseFile({
        structure: structuredData,
        masterConfig: baseFileYAML,
        entryYAMLFilePath: entryFilePath,
        readFile,
    });


    // Convert MD in every entry to HTML
    const structureWithParsedMD = structure.map((item) => {
        const html = convertMDToHTML(item);
        return {
            ...item,
            ...(html ? { html } : {}),
        };
    });


    // Load template, fill with values, write to file system
    for (const entry of structureWithParsedMD) {
        // console.log('entry', entry.title);
        // const { menu, ...nomenu } = entry;
        // console.log(JSON.stringify(nomenu, null, 2));
        // If entry has no destination, there's nowhere we could write the result too. This is a
        // menu item without a link/page, ignore it.
        if (!entry.destinationPath) continue;
        const rendered = await renderPage({ data: entry, templatePath: './templates/page.twig' });
        mkdirSync(join(outputDirectoryPath, entry.destinationPath), { recursive: true });
        writeFileSync(join(outputDirectoryPath, entry.destinationPath, 'index.html'), rendered);
        // Copy scripts, tyles, images, icons etc. to output directory
        const { sources } = entry;
        if (sources) {
            for (const [, paths] of Object.entries(sources)) {
                const destinationPath = join(outputDirectoryPath, paths.destination);
                // console.log('Copy %s to %s', paths.source, destinationPath);
                fsExtra.copySync(
                    paths.source,
                    destinationPath,
                );
            }
        }
    }


    // Create redirect from home directory to first entry in menu
    const firstEntryWithDestination = structureWithParsedMD.find((item) => !!item.destinationPath);
    if (firstEntryWithDestination) {
        const redirectFile = createIndexRedirect({
            destination: firstEntryWithDestination.destinationPath,
            templatePath: './templates/home.twig',
        });
        writeFileSync(join(outputDirectoryPath, 'index.html'), redirectFile);
    }

};
