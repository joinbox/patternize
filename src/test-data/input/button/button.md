---
title: Button Overview
sources:
  js: button.js
  css: button.css
scriptSources:
  - button.js
styleSources:
  - button.css
...

# Button

Variables that can be passed (as an object):
- `text` (Text; defaults to `'Send'`)
- `secondary` (Boolean; defaults to `false`)
- `arrow` (Boolean; defaults to `false`)

Displays button's text on click (as an `alert`).

```twig
{% include './button.twig' %}
```

## Hierarchy

### Primary

Default; only pass text.

```twig
{% include './button.twig' with {'text': 'Custom Text' } %}
```

### Secondary

Add property `secondary` with value `true`.

```twig
{% include './button.twig' with {'text': 'Custom Text', 'secondary': true } %}
```

## Icons

Add property `arrow` with value `true`.

```twig
  {% include "./button.twig" with {'text': 'Custom Text', 'arrow': true } %}
  {# TODO: Sometimes we get 'button.twig not found' when using two buttons in a code block #}
  {% include "./button.twig" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}
</div>
```
