export default [
  {
    "project": "Test Project",
    "sources": {
      "assets": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/assets",
        "destination": "test-project/assets"
      }
    },
    "scriptSources": [
      "assets/main.js"
    ],
    "styleSources": [
      "assets/main.css"
    ],
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
    },
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/base.yml",
    "showInMenu": false,
    "title": "Test Project",
    "destinationPath": "test-project",
    "paths": {
      "assets": "assets"
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
        ]
      }
    ]
  },
  {
    "title": "Introduction",
    "styleSources": [
      "test-project/assets/main.css"
    ],
    "scriptSources": [
      "test-project/assets/main.js"
    ],
    "paths": {
      "assets": "test-project/assets"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "test-project/introduction/home",
            "title": "Home"
          }
        ],
        "active": true
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "test-project/atoms/button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "test-project/atoms/heading",
            "title": "Heading"
          },
          {
            "destinationPath": "test-project/atoms/home",
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
    "destinationPath": "test-project/introduction/home",
    "styleSources": [
      "../../assets/main.css"
    ],
    "scriptSources": [
      "../../assets/main.js"
    ],
    "paths": {
      "assets": "../../assets"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
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
      "test-project/assets/main.css"
    ],
    "scriptSources": [
      "test-project/assets/main.js"
    ],
    "paths": {
      "assets": "test-project/assets"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
    },
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "test-project/introduction/home",
            "title": "Home"
          }
        ]
      },
      {
        "title": "Atoms",
        "children": [
          {
            "destinationPath": "test-project/atoms/button-overview",
            "title": "Button Overview"
          },
          {
            "destinationPath": "test-project/atoms/heading",
            "title": "Heading"
          },
          {
            "destinationPath": "test-project/atoms/home",
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
        "destination": "test-project/atoms/button-overview/button.js"
      },
      "css": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.css",
        "destination": "test-project/atoms/button-overview/button.css"
      },
      "phoneIcon": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/phone.svg",
        "destination": "test-project/atoms/button-overview/phone.svg"
      }
    },
    "scriptSources": [
      "button.js"
    ],
    "styleSources": [
      "button.css"
    ],
    "twigData": {
      "defaultText": "Text from twigData"
    },
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include './button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`:\n\n```twig\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n```\n\nUse a custom icon (e.g. SVG):\n\n```twig\n  {% include \"./button.twig\" with {'text': data.defaultText, 'icon': paths.phoneIcon } %}\n```\n",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.md",
    "destinationPath": "test-project/atoms/button-overview",
    "paths": {
      "js": "button.js",
      "css": "button.css",
      "phoneIcon": "phone.svg"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
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
        "destination": "test-project/atoms/button-overview/button-overview/button.js"
      },
      "css": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.css",
        "destination": "test-project/atoms/button-overview/button-overview/button.css"
      },
      "phoneIcon": {
        "source": "/Users/fs/Sites/patternizer/src/test-data/input/button/phone.svg",
        "destination": "test-project/atoms/button-overview/button-overview/phone.svg"
      }
    },
    "scriptSources": [
      "button.js"
    ],
    "styleSources": [
      "button.css"
    ],
    "twigData": {
      "defaultText": "Text from twigData"
    },
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include './button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include './button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`:\n\n```twig\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {% include \"./button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n```\n\nUse a custom icon (e.g. SVG):\n\n```twig\n  {% include \"./button.twig\" with {'text': data.defaultText, 'icon': paths.phoneIcon } %}\n```\n",
    "sourcePath": "/Users/fs/Sites/patternizer/src/test-data/input/button/button.md",
    "destinationPath": "test-project/atoms/button-overview/button-overview",
    "paths": {
      "js": "button.js",
      "css": "button.css",
      "phoneIcon": "phone.svg"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
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
        "destination": "test-project/atoms/heading/assets"
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
    "destinationPath": "test-project/atoms/heading",
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
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
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
    "destinationPath": "test-project/atoms/home",
    "styleSources": [
      "../../assets/main.css"
    ],
    "scriptSources": [
      "../../assets/main.js"
    ],
    "paths": {
      "assets": "../../assets"
    },
    "scripts": [
      "(() => console.log('entry file scripts executed'))()"
    ],
    "project": "Test Project",
    "twigFilters": {
      "t": "(text) => `${text} (translated)`"
    },
    "twigNamespaces": {
      "icons": "/Users/fs/Sites/patternizer/src/test-data/input/assets/icons"
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