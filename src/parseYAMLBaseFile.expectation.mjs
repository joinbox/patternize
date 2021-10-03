export default [
  {
    "title": "Introduction",
    "yaml": {
      "styles": [
        [
          "assets/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "assets/main.js",
          "main.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
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
            "destinationPath": "atoms/home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "yaml": {
      "title": "Home",
      "styles": [
        [
          "assets/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "assets/main.js",
          "main.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
    },
    "md": "\n# Pattern Overview\n\nThis is an overview. Go to [the Button](/atoms/button-overview).",
    "sourcePath": "./welcome.md",
    "title": "Home",
    "destinationPath": "introduction/home",
    "menu": [
      {
        "title": "Introduction",
        "children": [
          {
            "destinationPath": "introduction/home",
            "title": "Home",
            "active": true
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
            "destinationPath": "atoms/home",
            "title": "Home"
          }
        ]
      }
    ]
  },
  {
    "title": "Atoms",
    "yaml": {
      "styles": [
        [
          "assets/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "assets/main.js",
          "main.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
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
            "destinationPath": "atoms/home",
            "title": "Home"
          }
        ],
        "active": true
      }
    ]
  },
  {
    "yaml": {
      "title": "Button Overview",
      "styles": [
        [
          "button.css",
          "atoms/button-overview/button.css"
        ]
      ],
      "scripts": [
        [
          "button.js",
          "atoms/button-overview/button.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
    },
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include 'button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include 'button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include 'button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`.\n\n```twig\n  {% include \"button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {# TODO: Sometimes we get 'button.twig not found' when using two buttons in a code block #}\n  {% include \"button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n</div>\n```\n",
    "sourcePath": "./button/button.md",
    "title": "Button Overview",
    "destinationPath": "atoms/button-overview",
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
            "title": "Button Overview",
            "children": [
              {
                "destinationPath": "atoms/button-overview/button-overview",
                "title": "Button Overview"
              }
            ],
            "active": true
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
    "yaml": {
      "title": "Button Overview",
      "styles": [
        [
          "button.css",
          "atoms/button-overview/button-overview/button.css"
        ]
      ],
      "scripts": [
        [
          "button.js",
          "atoms/button-overview/button-overview/button.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
    },
    "md": "\n# Button\n\nVariables that can be passed (as an object):\n- `text` (Text; defaults to `'Send'`)\n- `secondary` (Boolean; defaults to `false`)\n- `arrow` (Boolean; defaults to `false`)\n\nDisplays button's text on click (as an `alert`).\n\n```twig\n{% include 'button.twig' %}\n```\n\n## Hierarchy\n\n### Primary\n\nDefault; only pass text.\n\n```twig\n{% include 'button.twig' with {'text': 'Custom Text' } %}\n```\n\n### Secondary\n\nAdd property `secondary` with value `true`.\n\n```twig\n{% include 'button.twig' with {'text': 'Custom Text', 'secondary': true } %}\n```\n\n## Icons\n\nAdd property `arrow` with value `true`.\n\n```twig\n  {% include \"button.twig\" with {'text': 'Custom Text', 'arrow': true } %}\n  {# TODO: Sometimes we get 'button.twig not found' when using two buttons in a code block #}\n  {% include \"button.twig\" with {'text': 'Custom Text', 'arrow': true, 'secondary': true } %}\n</div>\n```\n",
    "sourcePath": "./button/button.md",
    "title": "Button Overview",
    "destinationPath": "atoms/button-overview/button-overview",
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
            "title": "Button Overview",
            "children": [
              {
                "destinationPath": "atoms/button-overview/button-overview",
                "title": "Button Overview",
                "active": true
              }
            ]
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
    "yaml": {
      "title": "Home",
      "styles": [
        [
          "assets/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "assets/main.js",
          "main.js"
        ]
      ],
      "project": "Test Project",
      "twigFilters": {
        "t": "(text) => `${text} (translated)`"
      }
    },
    "md": "\n# Pattern Overview\n\nThis is an overview. Go to [the Button](/atoms/button-overview).",
    "sourcePath": "./welcome.md",
    "title": "Home",
    "destinationPath": "atoms/home",
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
            "destinationPath": "atoms/home",
            "title": "Home",
            "active": true
          }
        ]
      }
    ]
  }
];