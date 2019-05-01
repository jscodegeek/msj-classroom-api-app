module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
		"airbnb-typescript/base",
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
  ],
 parserOptions:  {
    ecmaVersion:  2017,
    sourceType:  'module',
  },
  rules:  {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-var-requires": "warn",
		"no-param-reassign": "warn",
		"prettier/prettier": ["error", {"useTabs": true}],
		"array-element-newline": ["error", "consistent"],
		"array-bracket-newline": ["error", "consistent"],
		"lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
		"@typescript-eslint/interface-name-prefix": ["error", "always"]
  },
};