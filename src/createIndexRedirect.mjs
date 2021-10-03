import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

/**
 * Creates a page that contains a redirect (meta tag) to the first menu entry. Will be stored as
 * index.html.
 * @param {object} argument.destination     Path that the user should be redirected to
 * @param {string} argument.templatePath    Path to the template that should be rendered
 * @returns {Promise}
 */
export default ({ destination, templatePath }) => {
    // We do not use renderFile (which is async) to reduce complexity
    const fullTemplatePath = join(basePath, templatePath);
    const { twig } = Twig;
    const template = twig({
        data: readFileSync(fullTemplatePath, 'utf8'),
    });
    return template.render({
        redirectPath: destination,
    });
};
