import { join, dirname } from 'path';
import mapObject from './mapObject.mjs';

/**
 * Converts paths of scriptSources, styleSources and twigNamespaces to paths relative to
 * destinationPath. All files will be copied to output directory and therefore be included from
 * the output directory (destinationPath).
 */
export default (item) => ({
    // Add current path to scriptSources, styleSources, twigNamespaces before they are merged
    ...item,
    ...((item.scriptSources && item.destinationPath) ? {
        scriptSources: item.scriptSources.map(
            (source) => join(item.destinationPath, source),
        ),
    } : {}),
    ...((item.styleSources && item.destinationPath) ? {
        styleSources: item.styleSources.map(
            (source) => join(item.destinationPath, source),
        ),
    } : {}),
    // Files from twigNamespaces are not copied to the destination, but consumed by twig right
    // from their source; therefore use the sourcePath
    ...((item.twigNamespaces && item.sourcePath) ? {
        twigNamespaces: mapObject(
            item.twigNamespaces,
            (source) => join(dirname(item.sourcePath), source),
        ),
    } : {}),
});
