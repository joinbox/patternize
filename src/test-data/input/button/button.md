---
title: Button Overview
sources:
  js: button.js
  css: button.css
  phoneIcon: ./phone.svg
scriptSources:
  - button.js
styleSources:
  - button.css
twigData: 
  defaultText: 'Text from twigData'
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

Add property `arrow` with value `true`:

```twig
  {% include "./button.twig" with {'text': 'Custom Text', 'arrow': true } %}
  {% include "./button.twig" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}
</div>
```

Use a custom icon (e.g. SVG):

```twig
  {% include "./button.twig" with {'text': data.defaultText, 'icon': paths.phoneIcon } %}
</div>
```
