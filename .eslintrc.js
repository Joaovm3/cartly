module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": ["error", {
            "printWidth": 80,
            "tabWidth": 2,
            "trailingComma": "all",
            "arrowParens": "always",
            "semi": false,
            "endOfLine": "auto",
            "singleQuote": true
        }],
        "react/react-in-jsx-scope": "off"
    },
    "settings": {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
        },
      },
    "ignorePatterns": [
        "node_modules",
        ".eslintrc.js"
    ]
}
