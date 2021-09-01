import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const yamlFilePath = join(basePath, '../../bm/web/themes/custom/bm/patterns.yml');

const entries = parseYAMLBaseFile(yamlFilePath);
for (const entry of entries) {
    generateDocumentation({
        title: entry.title,
        sourcePath: entry.sourcePath,
        destinationPath: entry.destinationPath,
        menu: entry.menu,
    });
}







// Walk tree, get every file with content (to get menu name)
// Create Menu (e.g. Name and Path)
// Walk Menu, fire some event per entry
// - Catch event, parse MD/YML
// - Fire some event for twig parts
//   - Catch event, parse twig
//   - Return result/code
// - Integrate result
// - Return finished HTML
// Create site with menu and HTML
// Store files

