import { Command } from 'commander/esm.mjs';
import createDocumentation from './index.mjs';

const program = new Command();
program
    .option('-i, --in <type>', 'Path to entry file')
    .option('-o, --out <type>', 'Path to folder that documentation will be stored into')
    .option('-f, --force', 'Force removal of existing content in output directory');

program.parse(process.argv);

const options = program.opts();
createDocumentation(options.in, options.out, options.force);
