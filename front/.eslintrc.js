module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'import',
    'react-hooks',
  ],
  rules: {
    'no-console': 0,
    'no-unused-vars': 1,
    'no-unexpected-multiline': 0,
    'no-empty': 1,
    'semi': [ 2, 'always', ],
    'quotes': [ 1, 'single', { allowTemplateLiterals: true, }, ],
    'eol-last': [ 1, 'never', ],
    'space-before-function-paren': 0,
    'array-bracket-spacing': [ 1, 'always', {
      arraysInArrays: true,
      singleValue: true,
      objectsInArrays: true,
    }, ],
    'arrow-parens': 0,
    'comma-spacing': [ 1, { before: false, after: true, }, ],
    'comma-dangle': [ 1, {
      arrays: 'always',
      functions: 'never',
      objects: 'always',
      imports: 'never',
      exports: 'never',
    }, ],
    'block-spacing': [ 1, 'always', ],
    'func-call-spacing': [ 1, 'never', ],
    'object-curly-spacing': [ 1, 'always', ],
    'arrow-spacing': [ 1, { before: true, after: true, }, ],
    'keyword-spacing': [ 1, {
      overrides: {
        if: { before: true, after: true, },
        for: { before: true, after: true, },
        while: { before: true, after: true, },
      },
    }, ],

    'jsx-quotes': [ 1, 'prefer-single', ],
    
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 1,
  },
};