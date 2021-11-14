export default [
  {
    "title": "Introduction",
    "styleSources": [
      "assets/main.css"
    ],
    "scriptSources": [
      "assets/main.js"
    ],
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "introduction/home",
            "title": "Home"
          }
        ],
        "active": true
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "atoms/button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "atoms/heading",
            "title": "Heading"
          },
          {
            "destinationPath": "atoms/home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Home",
    "md": "\n# Pattern Overview\n\nThis is an overview. Go to [the Button](../../atoms/button-overview).",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/welcome.md",
    "destinationPath": "introduction/home",
    "styleSources": [
      "../../assets/main.css"
    ],
    "scriptSources": [
      "../../assets/main.js"
    ],
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "../../assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "",
            "title": "Home",
            "active": true
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "../../atoms/button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "../../atoms/heading",
            "title": "Heading"
          },
          {
            "destinationPath": "../../atoms/home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Atoms",
    "styleSources": [
      "assets/main.css"
    ],
    "scriptSources": [
      "assets/main.js"
    ],
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "introduction/home",
            "title": "Home"
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "atoms/button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "atoms/heading",
            "title": "Heading"
          },
          {
            "destinationPath": "atoms/home",
            "title": "Home"
          }
        ],
        "active": true
      }
    ]
  },
  {
    "title": "Button Overview",
    "sources": {
      "js": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.js",
        "destination": "atoms/button-overview/button.js"
      },
      "css": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.css",
        "destination": "atoms/button-overview/button.css"
      }
    },
    "scriptSources": [
      "button.js"
    ],
    "styleSources": [
      "button.css"
    ],
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include './button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`.\n\n```twig\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {# TODO: Sometimes we get 'button.twig not found' when using two buttons in a code block #}\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n</div>\n```\n",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.md",
    "destinationPath": "atoms/button-overview",
    "paths": {
      "js": "button.js",
      "css": "button.css"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "../../assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "../../introduction/home",
            "title": "Home"
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "",
            "title": "Button Overview",
            "children": [
              {
                "destinationPath": "button-overview",
                "title": "Button Overview"
              }
            ],
            "active": true
          },
          {
            "destinationPath": "../heading",
            "title": "Heading"
          },
          {
            "destinationPath": "../home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Button Overview",
    "sources": {
      "js": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.js",
        "destination": "atoms/button-overview/button-overview/button.js"
      },
      "css": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.css",
        "destination": "atoms/button-overview/button-overview/button.css"
      }
    },
    "scriptSources": [
      "button.js"
    ],
    "styleSources": [
      "button.css"
    ],
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include './button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`.\n\n```twig\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {# TODO: Sometimes we get 'button.twig not found' when using two buttons in a code block #}\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n</div>\n```\n",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.md",
    "destinationPath": "atoms/button-overview/button-overview",
    "paths": {
      "js": "button.js",
      "css": "button.css"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "../../../assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "../../../introduction/home",
            "title": "Home"
          }
     
   ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "..",
            "title": "Button Overview",
            "children": [
              {
                "destinationPath": "",
                "title": "Button Overview",
                "active": true
              }
            ]
          },
          {
            "destinationPath": "../../heading",
            "title": "Heading"
          },
          {
            "destinationPath": "../../home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Heading",
    "sources": {
      "assets": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/heading/assets",
        "destination": "atoms/heading/assets"
      }
    },
    "styleSources": [
      "assets/heading.css"
    ],
    "scripts": [
      "console.log('heading');"
    ],
    "md": "\n# Headings\n\n```twig\n<h1 class=\"h1\">A heading</h1>\n```",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/heading/heading.md",
    "destinationPath": "atoms/heading",
    "paths": {
      "assets": "assets"
    },
    "scriptSources": [
      "../../assets/main.js"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "../../assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "../../introduction/home",
            "title": "Home"
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "../button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "",
            "title": "Heading",
            "active": true
          },
          {
            "destinationPath": "../home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Home",
    "md": "\n# Pattern Overview\n\nThis is an overview. Go to [the Button](../../atoms/button-overview).",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/welcome.md",
    "destinationPath": "atoms/home",
    "styleSources": [
      "../../assets/main.css"
    ],
    "scriptSources": [
      "../../assets/main.js"
    ],
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "../../assets/icons/arrow.svg"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "../../introduction/home",
            "title": "Home"
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "../button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "../heading",
            "title": "Heading"
          },
          {
            "destinationPath": "",
            "title": "Home",
            "active": true
          }
        ]
      }
    ]
  }
];
