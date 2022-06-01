module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: [
		'eslint:recommended'
		// 'plugin:cypress/recommended'
	],
	// 'parser': './node_modules/eslint-parser/index.js',
	parserOptions: {
		sourceType: 'module'
		// 'parser': 'babel-eslint',
		// 'sourceType': 'module',
		// 'ecmaFeatures': {
		//  'jsx': true
		// }
	},
	plugins: [
		// 'standard',
		// 'promise',
		// 'unicorn'
		// 'sort-keys-fix'
	],
	rules: {
		// 'sort-keys-fix/sort-keys-fix': 'warn',
		'sort-imports': ['error', {
			ignoreCase: false,
			ignoreDeclarationSort: false,
			ignoreMemberSort: false,
			memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			allowSeparatedGroups: false
		}],
		'no-console': [
			0
		],
		'arrow-parens': [
			'error',
			'as-needed',
			{
				requireForBlockBody: true
			}
		],
		'generator-star-spacing': [
			'off',
			{
				before: true,
				after: true
			}
		],
		'no-debugger': [
			'warn'
		],
		'prefer-const': [
			'error',
			{
				destructuring: 'any',
				ignoreReadBeforeAssign: false
			}
		],
		// 'no-lonely-if': [
		// 	'error'
		// ],
		curly: [
			'error',
			'all'
		],
		'require-await': [
			'error'
		],
		'dot-notation': [
			'error',
			{
				allowKeywords: true,
				allowPattern: ''
			}
		],
		'no-var': [
			'error'
		],
		'no-useless-rename': [
			'error'
		],
		'prefer-exponentiation-operator': [
			'error'
		],
		'unicorn/error-message': [
			'error'
		],
		'unicorn/escape-case': [
			'error'
		],
		// not comp old version browsers -> to check
		'unicorn/no-instanceof-array': [
			'error'
		],
		'unicorn/no-unsafe-regex': [
			'off'
		],
		'unicorn/number-literal-case': [
			'error'
		],
		'unicorn/prefer-includes': [
			'error'
		],
		// Could not find that rule
		// 'unicorn/prefer-text-content': [
		// 	'error'
		// ],
		'unicorn/prefer-type-error': [
			'error'
		],
		'unicorn/throw-new-error': [
			'error'
		],
		// 'accessor-pairs': [
		// 	'error'
		// ],
		'array-bracket-spacing': [
			'error',
			'never'
		],
		'arrow-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'block-spacing': [
			'error',
			'always'
		],
		'brace-style': [
			'error',
			'1tbs',
			{
				allowSingleLine: false
			}
		],
		camelcase: [
			'error',
			{
				properties: 'never',
				ignoreDestructuring: false,
				ignoreImports: false,
				ignoreGlobals: false
			}
		],
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'never'
			}
		],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'comma-style': [
			'error',
			'last'
		],
		'computed-property-spacing': [
			'error',
			'never'
		],
		'constructor-super': [
			'error'
		],
		'dot-location': [
			'error',
			'property'
		],
		'eol-last': [
			'error'
		],
		eqeqeq: [
			'error',
			'always',
			{
				null: 'ignore'
			}
		],
		'func-call-spacing': [
			'error',
			'never'
		],
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: {
					parameters: 1,
					body: 1
				},
				FunctionExpression: {
					parameters: 1,
					body: 1
				},
				CallExpression: {
					arguments: 1
				},
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: false,
				ignoreComments: false,
				ignoredNodes: [
					'TemplateLiteral *'
				],
				offsetTernaryExpressions: false
			}
		],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true
			}
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'lines-between-class-members': [
			'error',
			'always',
			{
				exceptAfterSingleLine: true
			}
		],
		'new-cap': [
			'error',
			{
				newIsCap: true,
				capIsNew: false,
				properties: true
			}
		],
		'new-parens': [
			'error'
		],
		'no-array-constructor': [
			'error'
		],
		'no-async-promise-executor': [
			'error'
		],
		'no-case-declarations': [
			'error'
		],
		'no-class-assign': [
			'error'
		],
		'no-compare-neg-zero': [
			'error'
		],
		'no-cond-assign': [
			'error'
		],
		'no-const-assign': [
			'error'
		],
		'no-constant-condition': [
			'error',
			{
				checkLoops: false
			}
		],
		'no-control-regex': [
			'error'
		],
		'no-delete-var': [
			'error'
		],
		'no-dupe-args': [
			'error'
		],
		'no-dupe-class-members': [
			'error'
		],
		'no-dupe-keys': [
			'error'
		],
		'no-duplicate-case': [
			'error'
		],
		'no-empty-character-class': [
			'error'
		],
		'no-empty-pattern': [
			'error'
		],
		'no-eval': [
			'error'
		],
		'no-ex-assign': [
			'error'
		],
		'no-extend-native': [
			'error'
		],
		'no-extra-bind': [
			'error'
		],
		'no-extra-boolean-cast': [
			'error'
		],
		'no-extra-parens': [
			'error',
			'functions'
		],
		'no-fallthrough': [
			'error'
		],
		'no-floating-decimal': [
			'error'
		],
		'no-func-assign': [
			'error'
		],
		'no-global-assign': [
			'error'
		],
		'no-implied-eval': [
			'error'
		],
		'no-inner-declarations': [
			'error',
			'functions'
		],
		'no-invalid-regexp': [
			'error'
		],
		'no-irregular-whitespace': [
			'error'
		],
		'no-iterator': [
			'error'
		],
		'no-labels': [
			'error',
			{
				allowLoop: false,
				allowSwitch: false
			}
		],
		'no-lone-blocks': [
			'error'
		],
		'no-misleading-character-class': [
			'error'
		],
		'no-prototype-builtins': [
			'error'
		],
		'no-useless-catch': [
			'error'
		],
		'no-mixed-operators': [
			'error',
			{
				groups: [
					[
						'==',
						'!=',
						'===',
						'!==',
						'>',
						'>=',
						'<',
						'<='
					],
					[
						'&&',
						'||'
					],
					[
						'in',
						'instanceof'
					]
				],
				allowSamePrecedence: true
			}
		],
		'no-mixed-spaces-and-tabs': [
			'error'
		],
		'no-multi-spaces': [
			'error'
		],
		'no-multi-str': [
			'error'
		],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxBOF: 0,
				maxEOF: 0
			}
		],
		'no-unsafe-negation': [
			'error',
			{
				enforceForOrderingRelations: true
			}
		],
		'no-new': [
			'error'
		],
		'no-new-func': [
			'error'
		],
		'no-new-object': [
			'error'
		],
		// Check babel ES5
		'no-new-symbol': [
			'error'
		],
		'no-new-wrappers': [
			'error'
		],
		'no-obj-calls': [
			'error'
		],
		'no-octal': [
			'error'
		],
		'no-octal-escape': [
			'error'
		],
		'no-proto': [
			'error'
		],
		'no-redeclare': [
			'error',
			{
				builtinGlobals: false
			}
		],
		'no-regex-spaces': [
			'error'
		],
		'no-return-assign': [
			'error'
		],
		'no-self-assign': [
			'error',
			{
				props: true
			}
		],
		'no-self-compare': [
			'error'
		],
		'no-sequences': [
			'error'
		],
		'no-shadow-restricted-names': [
			'error'
		],
		'no-sparse-arrays': [
			'error'
		],
		'no-template-curly-in-string': [
			'error'
		],
		'no-this-before-super': [
			'error'
		],
		'no-throw-literal': [
			'error'
		],
		'no-trailing-spaces': [
			'error'
		],
		'no-undef': [
			'error'
		],
		'no-undef-init': [
			'error'
		],
		'no-unexpected-multiline': [
			'error'
		],
		'no-unmodified-loop-condition': [
			'error'
		],
		'no-unreachable': [
			'error'
		],
		'no-unsafe-finally': [
			'error'
		],
		'no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true
			}
		],
		'no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'none',
				ignoreRestSiblings: true
			}
		],
		'no-use-before-define': [
			'error',
			{
				functions: false,
				classes: false,
				variables: false
			}
		],
		'no-useless-call': [
			'error'
		],
		'no-useless-computed-key': [
			'error'
		],
		'no-useless-constructor': [
			'error'
		],
		'no-useless-escape': [
			'error'
		],
		'no-useless-return': [
			'error'
		],
		'no-void': [
			'error'
		],
		'no-whitespace-before-property': [
			'error'
		],
		'no-with': [
			'error'
		],
		'object-curly-newline': [
			'error',
			{
				multiline: true,
				consistent: true
			}
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'object-property-newline': [
			'error',
			{
				allowAllPropertiesOnSameLine: false,
				allowMultiplePropertiesPerLine: true
			}
		],
		'one-var': [
			'error',
			{
				initialized: 'never'
			}
		],
		'operator-linebreak': [
			'error',
			'before'
		],
		'padded-blocks': [
			'error',
			{
				blocks: 'never',
				switches: 'never',
				classes: 'never'
			}
		],
		'prefer-promise-reject-errors': [
			'error'
		],
		'quote-props': [
			'error',
			'as-needed'
		],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true
			}
		],
		'rest-spread-spacing': [
			'error',
			'never'
		],
		semi: [
			'error',
			'always'
		],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'space-before-blocks': [
			'error',
			'always'
		],
		'space-before-function-paren': [
			'error',
			'always'
		],
		'space-in-parens': [
			'error',
			'never'
		],
		'space-infix-ops': [
			'error'
		],
		'space-unary-ops': [
			'error',
			{
				words: true,
				nonwords: false
			}
		],
		'spaced-comment': [
			'error',
			'always',
			{
				line: {
					markers: [
						'*package',
						'!',
						'/',
						',',
						'='
					]
				},
				block: {
					balanced: true,
					markers: [
						'*package',
						'!',
						',',
						':',
						'::',
						'flow-include'
					],
					exceptions: [
						'*'
					]
				}
			}
		],
		'symbol-description': [
			'error'
		],
		'unicode-bom': [
			'error',
			'never'
		],
		// check IE
		'use-isnan': [
			'error'
		],
		'valid-typeof': [
			'error',
			{
				requireStringLiterals: true
			}
		],
		'wrap-iife': [
			'error',
			'any',
			{
				functionPrototypeMethods: true
			}
		],
		'yield-star-spacing': [
			'error',
			'both'
		],
		yoda: [
			'error',
			'never'
		]
		// 'promise/param-names': [
		// 	'error'
		// ]
	},
	globals: {
		// $: 'writeable',
		// Base64: 'writeable',
		// ConnectApi: 'writeable',
		// EventDispatcher: 'writeable',
		// FB: 'writeable',
		// Flygresor: 'writeable',
		google: 'writeable',
		Handlebars: 'writeable',
		// Main: 'writeable',
		// ModuleSearchBox: 'writeable',
		// OutclickModal: 'writeable',
		// PRICECUTTER: 'writeable',
		// PriceTag: 'writeable',
		// Showresult: 'writeable',
		// Spinner: 'writeable',
		// clearOverlays: 'writeable',
		// dataLayer: 'writeable',
		// dateSelector: 'writeable',
		// errorTracking: 'writeable',
		// google: 'writeable',
		// integrated_booking: 'writeable',
		jQuery: 'writeable',
		js_params: 'writeable',
		// lint: 'writeable',
		// localized: 'writeable',
		// moment: 'writeable',
		// noUiSlider: 'writeable',
		// objectFitImages: 'writeable',
		pricehunter_map: 'writeable'
		// priceCalendar: 'writeable',
		// priceCutter: 'writeable',
		// pricehunter: 'writeable',
		// pricehunterCommon: 'writeable',
		// searchBox: 'writeable',
		// showresultFlightmap: 'writeable',
		// showresult_flightmap: 'writeable',
		// showresult_timeline: 'writeable',
		// showresultTimetable: 'writeable',
		// trackEvent: 'writeable',
		// yall: 'writeable',
		// // UTILS
		// listToArray: 'writeable',
		// deepCopy: 'writeable',
		// isValidEmail: 'writeable',
		// addZero: 'writeable',
		// getCookie: 'writeable',
		// setCookie: 'writeable',
		// eraseCookie: 'writeable',
		// getUrlVars: 'writeable',
		// removeUrlParameter: 'writeable',
		// setUrlParameter: 'writeable',
		// range: 'writeable',
		// getTimeText: 'writeable',
		// lc: 'writeable',
		// l: 'writeable',
		// lm: 'writeable',
		// lreplace: 'writeable',
		// getFormattedDate: 'writeable',
		// getAgencyImagePath: 'writeable',
		// getSearchBoxConfigFromUrl: 'writeable',
		// getTrackingClass: 'writeable',
		// storeItem: 'writeable',
		// getStoredItem: 'writeable',
		// removeStoredItem: 'writeable'
	},
	ignorePatterns: []
};
