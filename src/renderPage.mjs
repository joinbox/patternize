import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

/**
 * Renders a documentation page
 * @param {object} argument.data            Processed and enriched entry from base YAML
 * @param {string} argument.templatePath    Path to the template that should be rendered
 * @returns {Promise}
 */
export default ({ data, templatePath }) => {
    // Use renderFile (instead of manual rendering) to ensure that all include paths can be
    // resolved; we'd have to rewrite them (to absolute paths; base is cwd) if we used render
    // instead.
    const fullTemplatePath = join(basePath, templatePath);
    let resolve;
    let reject;
    // renderFile uses callbacks; convert them to a promise.
    const promise = new Promise((originalResolve, originalReject) => {
        resolve = originalResolve;
        reject = originalReject;
    });
    Twig.renderFile(fullTemplatePath, data, (err, html) => {
        if (err) reject(err);
        else resolve(html);
    });
    return promise;
};
