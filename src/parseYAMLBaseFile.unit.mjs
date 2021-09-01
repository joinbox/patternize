import test from 'ava';
import parseYAMLBaseFile from './parseYAMLBaseFile.mjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));
const yamlFilePath = join(basePath, 'test-data/input/base.yml');

test('parses yaml base file', (t) => {
    const result = parseYAMLBaseFile(yamlFilePath)
    t.deepEqual(
        result,
        [
          {
            title: 'Home',
            sourcePath: './welcome.md',
            path: [ 0 ],
            destinationPath: 'home.html',
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html',
                active: true
              },
              { title: 'Basics', path: [ 1 ] },
              { title: 'Atoms', path: [ 2 ] }
            ]
          },
          {
            children: [ { title: 'Entry', path: [ 1, 0 ] } ],
            title: 'Basics',
            path: [ 1 ],
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html'
              },
              {
                children: [ { title: 'Entry', path: [ 1, 0 ] } ],
                title: 'Basics',
                path: [ 1 ],
                active: true
              },
              { title: 'Atoms', path: [ 2 ] }
            ]
          },
          {
            title: 'Entry',
            path: [ 1, 0 ],
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html'
              },
              {
                children: [ { title: 'Entry', path: [ 1, 0 ], active: true } ],
                title: 'Basics',
                path: [ 1 ],
                active: true
              },
              { title: 'Atoms', path: [ 2 ] }
            ]
          },
          {
            children: [
              {
                children: [
                  {
                    title: 'Button Overview',
                    sourcePath: './button/button.md',
                    path: [ 2, 0, 0 ],
                    destinationPath: 'atoms/buttons/button-overview.html'
                  }
                ],
                title: 'Buttons',
                path: [ 2, 0 ]
              }
            ],
            title: 'Atoms',
            path: [ 2 ],
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html'
              },
              { title: 'Basics', path: [ 1 ] },
              {
                children: [ { title: 'Buttons', path: [ 2, 0 ] } ],
                title: 'Atoms',
                path: [ 2 ],
                active: true
              }
            ]
          },
          {
            children: [
              {
                title: 'Button Overview',
                sourcePath: './button/button.md',
                path: [ 2, 0, 0 ],
                destinationPath: 'atoms/buttons/button-overview.html'
              }
            ],
            title: 'Buttons',
            path: [ 2, 0 ],
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html'
              },
              { title: 'Basics', path: [ 1 ] },
              {
                children: [
                  {
                    children: [
                      {
                        title: 'Button Overview',
                        sourcePath: './button/button.md',
                        path: [ 2, 0, 0 ],
                        destinationPath: 'atoms/buttons/button-overview.html'
                      }
                    ],
                    title: 'Buttons',
                    path: [ 2, 0 ],
                    active: true
                  }
                ],
                title: 'Atoms',
                path: [ 2 ],
                active: true
              }
            ]
          },
          {
            title: 'Button Overview',
            sourcePath: './button/button.md',
            path: [ 2, 0, 0 ],
            destinationPath: 'atoms/buttons/button-overview.html',
            menu: [
              {
                title: 'Home',
                sourcePath: './welcome.md',
                path: [ 0 ],
                destinationPath: 'home.html'
              },
              { title: 'Basics', path: [ 1 ] },
              {
                children: [
                  {
                    children: [
                      {
                        title: 'Button Overview',
                        sourcePath: './button/button.md',
                        path: [ 2, 0, 0 ],
                        destinationPath: 'atoms/buttons/button-overview.html',
                        active: true
                      }
                    ],
                    title: 'Buttons',
                    path: [ 2, 0 ],
                    active: true
                  }
                ],
                title: 'Atoms',
                path: [ 2 ],
                active: true
              }
            ]
          }
        ]
    );
});
