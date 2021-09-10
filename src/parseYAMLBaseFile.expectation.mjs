export default [
  {
    "yaml": {
      "title": "Home",
      "styles": [
        [
          "css/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "js/main.js",
          "main.js"
        ]
      ]
    },
    "md": "\n# Pattern Overview\n\nThis is an overview",
    "sourcePath": "./welcome.md",
    "title": "Home",
    "path": [
      0
    ],
    "destinationPath": "home",
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home",
        "active": true
      },
      {
        "title": "Basics"
      },
      {
        "title": "Atoms"
      }
    ]
  },
  {
    "children": [
      {
        "title": "Entry",
        "path": [
          1,
          0
        ],
        "yaml": {
          "styles": [
            [
              "css/main.css",
              "main.css"
            ]
          ],
          "scripts": [
            [
              "js/main.js",
              "main.js"
            ]
          ]
        }
      }
    ],
    "title": "Basics",
    "path": [
      1
    ],
    "yaml": {
      "styles": [
        [
          "css/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "js/main.js",
          "main.js"
        ]
      ]
    },
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home"
      },
      {
        "title": "Basics",
        "children": [
          {
            "title": "Entry"
          }
        ],
        "active": true
      },
      {
        "title": "Atoms"
      }
    ]
  },
  {
    "title": "Entry",
    "path": [
      1,
      0
    ],
    "yaml": {
      "styles": [
        [
          "css/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "js/main.js",
          "main.js"
        ]
      ]
    },
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home"
      },
      {
        "title": "Basics",
        "children": [
          {
            "title": "Entry",
            "active": true
          }
        ],
        "active": true
      },
      {
        "title": "Atoms"
      }
    ]
  },
  {
    "children": [
      {
        "children": [
          {
            "yaml": {
              "title": "Button Overview",
              "styles": [
                "button.css"
              ],
              "scripts": [
                "button.js"
              ]
            },
            "md": "\n# Button\n\n## Primary",
            "sourcePath": "./button/button.md",
            "title": "Button Overview",
            "path": [
              2,
              0,
              0
            ],
            "destinationPath": "atoms/buttons/button-overview",
            "styles": [
              [
                "button.css",
                "atoms/buttons/button-overview/button.css"
              ]
            ],
            "scripts": [
              [
                "button.js",
                "atoms/buttons/button-overview/button.js"
              ]
            ]
          }
        ],
        "title": "Buttons",
        "path": [
          2,
          0
        ],
        "yaml": {
          "styles": [
            [
              "css/main.css",
              "main.css"
            ]
          ],
          "scripts": [
            [
              "js/main.js",
              "main.js"
            ]
          ]
        }
      }
    ],
    "title": "Atoms",
    "path": [
      2
    ],
    "yaml": {
      "styles": [
        [
          "css/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "js/main.js",
          "main.js"
        ]
      ]
    },
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home"
      },
      {
        "title": "Basics"
      },
      {
        "title": "Atoms",
        "children": [
          {
            "title": "Buttons"
          }
        ],
        "active": true
      }
    ]
  },
  {
    "children": [
      {
        "yaml": {
          "title": "Button Overview",
          "styles": [
            "button.css"
          ],
          "scripts": [
            "button.js"
          ]
        },
        "md": "\n# Button\n\n## Primary",
        "sourcePath": "./button/button.md",
        "title": "Button Overview",
        "path": [
          2,
          0,
          0
        ],
        "destinationPath": "atoms/buttons/button-overview",
        "styles": [
          [
            "button.css",
            "atoms/buttons/button-overview/button.css"
          ]
        ],
        "scripts": [
          [
            "button.js",
            "atoms/buttons/button-overview/button.js"
          ]
        ]
      }
    ],
    "title": "Buttons",
    "path": [
      2,
      0
    ],
    "yaml": {
      "styles": [
        [
          "css/main.css",
          "main.css"
        ]
      ],
      "scripts": [
        [
          "js/main.js",
          "main.js"
        ]
      ]
    },
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home"
      },
      {
        "title": "Basics"
      },
      {
        "title": "Atoms",
        "children": [
          {
            "title": "Buttons",
            "children": [
              {
                "destinationPath": "atoms/buttons/button-overview",
                "title": "Button Overview"
              }
            ],
            "active": true
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
        "button.css"
      ],
      "scripts": [
        "button.js"
      ]
    },
    "md": "\n# Button\n\n## Primary",
    "sourcePath": "./button/button.md",
    "title": "Button Overview",
    "path": [
      2,
      0,
      0
    ],
    "destinationPath": "atoms/buttons/button-overview",
    "styles": [
      [
        "button.css",
        "atoms/buttons/button-overview/button.css"
      ]
    ],
    "scripts": [
      [
        "button.js",
        "atoms/buttons/button-overview/button.js"
      ]
    ],
    "menu": [
      {
        "destinationPath": "home",
        "title": "Home"
      },
      {
        "title": "Basics"
      },
      {
        "title": "Atoms",
        "children": [
          {
            "title": "Buttons",
            "children": [
              {
                "destinationPath": "atoms/buttons/button-overview",
                "title": "Button Overview",
                "active": true
              }
            ],
            "active": true
          }
        ],
        "active": true
      }
    ]
  }
];