import test from 'ava';
import parseYAML from './parseYAML.mjs';

test('parses YAML', (t) => {
    const data = `
        property: value
        list:
            - item1
            - item2
    `;
    const result = parseYAML(data);
    t.deepEqual(result, {
        property: 'value',
        list: ['item1', 'item2'],
    });
});

test('works with invalid YAML', (t) => {
    // See https://stackoverflow.com/questions/41390421/invalid-yaml-formatting
    const invalidYAML = `
        playing_song_artist: Playing song, {{ song_name }} by {{ artist }}
        playing_playlist: {{ action }} playlist {{ playlist_name }}
    `;
    t.throws(() => parseYAML(invalidYAML));
});
