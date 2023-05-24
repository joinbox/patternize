import { join, dirname } from 'path';
import { version } from 'process';
import { fileURLToPath } from 'url';
import {
    writeFileSync,
    existsSync,
    mkdirSync,
    rmSync,
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


    const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

    // Check node version (for Andi)
    const major = parseInt(version.substring(1).match(/^\d+/), 10);
    const requiredMajor = 14;
    if (major < requiredMajor) {
        throw new Error(`Use Node v${requiredMajor} or higher`);
    }

    // Output directory does not exist
    if (!existsSync(outputDirectoryPath)) {
        throw new Error(`Directory for outputPath ${outputDirectoryPath} does not exist; create it first.`);
    }

    // Output directory contains files and forceEmpty option is not set.
    if (readdirSync(outputDirectoryPath).length && !forceEmptyOutputDirectory) {
        throw new Error(`index.mjs: outputPath ${outputDirectoryPath} contains files: ${readdirSync(outputDirectoryPath).join(', ')}; remove them or use force option to have them removed before you continue`);
    }

    // Check if relevant files exist and provide human readable error messages
    try {
        statSync(entryFilePath);
    } catch (err) {
        throw new Error(`File for entryFilePath ${entryFilePath} does not exist.`);
    }

    rmSync(outputDirectoryPath, { recursive: true });
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
            // Add html property to returned object if it is present
            ...(html ? { html } : {}),
        };
    });


    // Load template, fill with values, write to file system
    for (const entry of structureWithParsedMD) {
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
                if (existsSync(destinationPath)) {
                    console.warn(
                        'Overwriting path %s (from source %s), make sure you don\'t use child components or chapters with the same name as source paths.',
                        destinationPath,
                        paths.source,
                    );
                }
                fsExtra.copySync(
                    paths.source,
                    destinationPath,
                );
            }
        }
    }


    // Create redirect from home directory to first entry in menu that is *not* the masterConfig
    // (which has a structure)
    const firstEntryWithDestination = structureWithParsedMD.find(
        (item) => !!item.destinationPath && !item.structure,
    );
    if (firstEntryWithDestination) {
        const redirectFile = createIndexRedirect({
            destination: firstEntryWithDestination.destinationPath,
            templatePath: './templates/home.twig',
        });
        writeFileSync(join(outputDirectoryPath, 'index.html'), redirectFile);
    }

    // Clone JS/CSS files (we cannot load them externally for certain projects due to CSP or WAF
    // restrictions)
    const libraries = [
        'bulma.min.css',
        'highlight.min.js',
        'tomorrow-night-bright.min.css',
        'twig.min.js',
    ];
    for (const library of libraries) {
        fsExtra.copySync(
            join(basePath, 'lib', library),
            join(outputDirectoryPath, 'lib', library),
        );
    }

};
