# Patternize


## Introduction

A small Node.js script that generates a static **pattern library** or **design system documentation**
from Twig based templates. The resulting documentation can be served from any static file server.


## Installation
- Requires Node.js ≥ 14
- `npm i -g @joinbox/patternize` (use `-g` flag only if you want to execute patternize as a 
  command line tool in global scope)


## Use

### Execution

- WIP: Either use via command line: `patternize -i path/to/entry/file.yml -o path/to/output/directory -f`
- Or use in a node script (e.g. via task runner): 
  ```javascript
  import patternize from '@joinbox/patternize';
  patternize({
    entryFilePath: 'path/to/entry/file.yml',
    outputDirectoryPath: 'path/to/output/directory',
    forceEmptyOutputDirectory: true,
  });
  ```

### Short Overview
- Create one Markdown (MD) file per documentation page (e.g. one file per component if every
component should have its own page in the documentation).
- Create a main file that structures your documentation.

### Preliminary Note
- All source paths are expected to be relative to file they're defined in.
- Some properties will be inherited along the `structure` defined in the entry file. Those
  properties are: `sources`, `styleSources`, `scriptSources`, `twigFunctions`, `twigFilters`,
  `twigNamespaces`, `twigData`.
  Properties defined within a descendant precede the inheritance (and will be inherited themselves
  by their descendants).

### Documentation Page
- Create a Markdown file per documentation page. The file consists of a YAML and a Markdown part.
- The YAML part is at the beginning of the file, starts with three dashes (`---`) and ends with
three dots (`...`). All characters below the YAML part are considered to be Markdown.
- The YAML part accepts the following properties:
    - `title` (string, optional): String that will be used for the documentation page's `<title>`
      attribute and the menu entry.
    - `sources` (object with any identifier as key and the source path [relative to the file where
      it is defined in as value, optional): Directories or files that will
      be cloned to the documentation's output directory. Any content of those copied folders or
      files can be used in `scrpitSources` and `styleSources`. The path leading to the **cloned**
      directory or files can be used in the `twig` code block of your MD files with the identifier
      provided, e.g. as `{{ paths.myIdentifier }}/image.webp` if you provided a source with
      identifier `myIdentifier`.
    - `scriptSources` (array of strings, optional): JavaScripts that will be injected at the end of
      the body as a `<script>` tag with corresponding `src` atribute (one script tag per array
      item); if files are local, copy them via the `sources` property.
    - `styleSources` (array of strings, optional): CSS that will be injected at the end of the
      head as a `<link>` tag with corresponding `href` atribute (one link tag per array item); if
      files are local, copy them via the `sources` property.
    - `scripts` (array of strings, optional): JavaScript snippets that will be executed at the
      end of the body (after `scriptSources`).
    - `twigFunctions` (object, optional): Object with a function's name as key (String) and
      a function's JavaScript body as value (String). See
      [TwigJS' function documentation](http://jmsyst.com/libs/twig.js/master/functions).
    - `twigFilters` (object, optional): Object with a filter's name as key (String) and
      a filter's JavaScript body as value (String). See
      [TwigJS' filter documentation](http://jmsyst.com/libs/twig.js/master/filters).
    - `twigNamespaces` (object, optional): Object with a namespace's name as key (String) and
      its path as value (string). See
      [TwigJS' namespace wiki entry](https://github.com/twigjs/twig.js/wiki#user-content-namespaces).
      Make sure to copy files to output directory via the `sources` property and to use the output
      path.
    - `twigData` (any parsable JavaScript code, optional): Data that can be accessed from within
      all your `twig` code blocks on the given MD page. Needed to e.g. mock twig functions
      (which can not be defined from within twig code). If you use e.g.
      `getClasses: () => ['class1', 'class2']` as `twigData`, you can access them within your
      `twig` code block as `{{ data.getClasses()|join(' ') }}
- Use any Markdown commands in the Markdown part.
- To embed a component, use the Markdown multiline code syntax with type `twig`. The component will
  be displayed as a tab view with Twig, HTML and rendered output.

### Entry File
- Create a YAML file that serves as an entry point to all documentation pages
- The following properties are available:
    - `structure` (array, mandatory): The documentation's structure as a (nested) array of strings.
      On the first level, you may use any string you like; if the string is a path to a MD file,
      the MD file will be used; if it does not, the string will be used for a crossheading. On all
      further levels, the string provided must be a path to a MD file. The first entry in
      `structure` that resolves to a MD file will be the documentation's home page.
    - `project`(string, mandatory): The project's name, will be used within every documentation
      page's `<title>` tag.
    - More: See all properties (except `title`) in chapter Documentation Page above.

### Command Line
Use `patternize -h` to see the command line tool flags available.

### Example
`main.yml` file:

```yaml
---
project: My Project's Name
sources:
  assets: assets
scriptSources:
  - assets/main.js
styleSources:
  - assets/main.css
scripts:
  - console.log('I'm called on the documentation page on load');
structure:
  - Introduction
  - - ./welcome.md
  - Atoms
  - - ./button.md
...
```

`welcome.md` file:
~~~markdown
---
title: Welcome
...

# Welcome

Here's the content:
- [Buttons](./atoms/button)
~~~


`button.md` file to document a button's behavior: 
~~~markdown
---
title: Button Overview
sources:
  dist: path/to/dist-folder
  pictures: path/to/pictures-folder
styleSources:
  - path/to/dist-folder/css/button.css
scriptSources:
  - path/to/dist-folder/js/button.js
twigFilters:
  t: (text) => `assumeIAmTranslated(${text})`
twigData:
  getClasses: () => ['myClassName']
...

# Button

I am a button's documentation.

```twig
  {% include 'button.twig' with {
      classes: data.getClasses(),
      pictureDirectory: paths.pictures,
      name: 'buttonContent'|t
  }  %}
```
~~~


### Limitations
We use [twig.js](https://github.com/twigjs/twig.js/wiki) to render Twig, which is a JavaScript
implementation that is a bit behind the PHP master version. Therefore you can not use:
1. the [include function](https://twig.symfony.com/doc/2.x/functions/include.html) yet
([Issue](https://github.com/twigjs/twig.js/issues/392)). Use the
[include tag](https://twig.symfony.com/doc/3.x/tags/import.html) instead.

We use [Marked](https://github.com/markedjs/marked) as a Markdown renderer.