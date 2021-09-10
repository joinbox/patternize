import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const templatePath = join(basePath, './templates/page.twig');

/**
 * Renders a documentation page
 * @param {object} data     Processed and enriched entry from base YAML
 * @returns {Promise}
 */
export default (data) => {
    // We do not use renderFile (which is async) to reduce complexity
    const { twig } = Twig;
    const template = twig({
        allowInlineIncludes: true,
        data: readFileSync(templatePath, 'utf8'),
    });
    return template.render(data);
};
