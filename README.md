# Patternizer


## Introduction

A small Node.js script that generates a static **pattern library** or **design system documentation**
from Twig based templates. The resulting documentation can be served from any static file server.


## Installation
- `npm i -g @joinbox/patternize`
- `patternize --i path/to/entry/file.yaml --o path/to/output/directory -f`


## Use

### Short Overview
- Create one Markdown (MD) file per documentation page (e.g. one file per component if every
component should have its own page in the documentation)
- Create a main file that structures your documentation 

### Preliminary Note
- All paths are expected to be relative to the entry file
- Some properties will be inherited along the `structure` defined in the entry file. Those
  properties are: `styles`, `scripts`, `twigFunctions`, `twigFilters` and `twigNamespaces`.
  Properties defined within a descendant precede the inheritance (and will be inherited themselves).

### Documentation Page Structure
- Create a Markdown file per documentation page. The file consists of a YAML and a Markdown part.
- The YAML part is at the beginning of the file, starts with three dashes (`---`) and ends with
three dots (`...`). All characters below the YAML part are considered to be Markdown.
- The YAML part accepts the following properties:
    - `title` (String, optional): String that will be used for the documentation page's `<title>`
      attribute and the menu entry.
    - `scripts` (Array of Strings, optional): Path to JavaScript files that should be embedded
      within the documentation.
    - `styles` (Array of Styles, optional): Path to CSS files that should be embedded
      within the documentation.
    - `twigFunctions` (Object, optional): Object with a function's name as key (String) and
      a function's JavaScript body as value (String). See [TwigJS' function documentation](http://jmsyst.com/libs/twig.js/master/functions).
    - `twigFilters` (Object, optional): Object with a filter's name as key (String) and
      a filter's JavaScript body as value (String). See [TwigJS' filter documentation](http://jmsyst.com/libs/twig.js/master/filters).
    - `twigNamespaces` (Object, optional): Object with a namespace's name as key (String) and
      its path as value (String). See [TwigJS' namespace wiki entry](https://github.com/twigjs/twig.js/wiki#user-content-namespaces).
- Use any Markdown commands in the Markdown part.
- To embed a component, use the Markdown multiline code syntax with type `twig`. The component will
  be displayed as a tab view with Twig, HTML and rendered output.

### Entry File Structure
- Create a YAML file that serves as an entry point to all documentation pages
- The following properties are available:
    - `structure` (Array, mandatory): The documentation's structure as a (nested) array of strings.
      On the first level, you may use any string you like; if the string is a path to a MD file,
      the MD file will be used; if it does not, the string will be used for a crossheading. On all
      further levels, the string provided must be a path to a MD file. The first entry in
      `structure` that resolves to a MD file will be the documentation's home page.
    - `project`(String, mandatory): The project's name, will be used within every documentation
      page's `<title>` tag.
    - `scripts`, `styles`, `twigFunctions`, `twigFilteres` and `twigNamespaces`: See above.

### Command Line
Use `patternizer -h` to see the command line tool flags available.

### Example
`main.yaml` file:

```yaml
---
project: My Project's Name
scripts:
  - assets/main.js
styles:
  - assets/main.css
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
styles:
  - button.css
scripts:
  - button.js
twigFilters:
  t: (text) => `assumeIAmTranslated(${text})`
...

# Button

I am a button's documentation.

```twig
  {% include 'button.twig' %}
```
~~~


### Limitations
We use [twig.js](https://github.com/twigjs/twig.js/wiki) to render Twig, which is a JS
implementation that is a bit behind the PHP master version. Therefore you can not use:
1. the [import function](https://twig.symfony.com/doc/2.x/functions/include.html) yet
([Issue](https://github.com/twigjs/twig.js/issues/392)). Use the
[import tag](https://twig.symfony.com/doc/3.x/tags/import.html) instead.

We use [Marked](https://github.com/markedjs/marked) as a Markdown renderer.