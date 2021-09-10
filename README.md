# Patternizer

## What?

A small Node.js script that generates a static pattern library from Drupal (Twig) based templates

## How?

TBD. Basically (in the future):
- `npm i @joinbox/patternizer`
- Create Pattern definitions in your project (w/ YAML, Markdown and Twig code)
- `patternize source/files/**.md destination``
- Deploy created static HTML files

## Documentation

### Main file
- Create a YAML file that serves as an entry point
- The YAML file needs a structure property that consists of (nested) arrays of strings; the
strings may either be files (path relative to entry file) or a title. 
- If entry is a path, the corresponding file (see below) will be fetced; its title property will be
used as menu entry and the menu entry will link to the corresponding component's documentation.
- First entry in `structure` will be the home page
- Only use non-links on first level

### Component Documentation
- Use a Markdown file with a prepended YAML part to document a component.
- In the YAML part, use
    - `output: false` if no documentation page should be generated for the file

- twigFunctions, twigFilters, twigNamespaces, (twigBasePath)

### Limitations
We use [twig.js](https://github.com/twigjs/twig.js/wiki) to render Twig, which is a JS
implementation that is a bit behind the PHP master version. Therefore you can not use:
- the [import function](https://twig.symfony.com/doc/2.x/functions/include.html) yet
([Issue](https://github.com/twigjs/twig.js/issues/392)). Use the
[import tag](https://twig.symfony.com/doc/3.x/tags/import.html) instead.