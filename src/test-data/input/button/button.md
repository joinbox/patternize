---
title: Button Overview
styles:
  - button.css
scripts:
  - button.js
...

# Button

## Primary

Variables that can be passed (as an object):
- `text` (Text; defaults to `'Send'`)

```twig
{% include 'button.twig' with {'text': 'Custom Text' } %}
```

## Secondary

Add property `secondary` with value `true`:

```twig
{% include 'button.twig' with {'text': 'Custom Text', 'secondary': true } %}
```
