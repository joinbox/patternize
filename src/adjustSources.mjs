import { join, dirname } from 'path';
import mapObject from './mapObject.mjs';

/**
 * Update sources by converting them to an object with source and destination properties and
 * absolute/relative paths.
 * Then add paths property (will be changed to relative to current directory later); consists
 * of one entry per source and is needed to e.g. use sources (images, icons, fonts) within
 * twig code blocks in MD.
 */
export default (item) => {

    const itemWithUpdatedSources = {
        ...item,
        ...((item.sources && item.destinationPath) ? {
            sources: mapObject(
                item.sources,
                (value) => ({
                    source: join(dirname(item.sourcePath), value),
                    destination: join(item.destinationPath, value),
                }),
            ),
        } : {}),
    };

    const itemWithPaths = {
        ...itemWithUpdatedSources,
        ...(itemWithUpdatedSources.sources ? {
            paths: mapObject(itemWithUpdatedSources.sources, ({ destination }) => destination),
        } : {}),
    };

    return itemWithPaths;

};
