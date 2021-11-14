#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import createDocumentation from './index.mjs';

const program = new Command();
program
    .requiredOption('-i, --in <type>', 'Path to entry file')
    .requiredOption('-o, --out <type>', 'Path to folder that documentation will be stored into')
    .option('-f, --force', 'Force removal of existing content in output directory');

program.parse(process.argv);

const options = program.opts();
createDocumentation({
    entryFilePath: options.in,
    outputDirectoryPath: options.out,
    forceEmptyOutputDirectory: options.force,
});
