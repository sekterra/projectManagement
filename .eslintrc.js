// https://eslint.org/docs/user-guide/configuring
// eslint-disable-next-line 
/* eslint-disable */
module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2017,
      sourceType: 'module'
    },    
    extends: [
        'eslint-config-alloy/vue',
    ],
    globals: {
        // 여기에 프로젝트에 필요한 전역 변수를 입력하십시오.
        // 이 전역 변수를 다시 할당 할 수 없음을 나타내는 false 값은 다음과 같습니다.：
        //
        // Vue: false
    },
    rules: {
        // 프로젝트에 필요한 맞춤 설정을 입력하십시오.：
        //
        // // @fixable 들여 쓰기는 두 칸으로 바꿔야합니다.
        'indent': [
            'error',
            2,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        //  0 = off, 1 = warn, 2 = error
        'no-undef-init': 2,
        'no-trailing-spaces': 0,    // 후행공백
        'no-undefined': 0,
        'no-void': 2,   // Disallow use of the void operator
        'no-var': 0,
        'no-unused-vars': 0,    // Disallow Unused Variables
        'no-param-reassign': 0, // Disallow Reassignment of Function Parameters
        "space-before-function-paren": ["error", {  // Require or disallow a space before function parenthesis 
            "anonymous": "always",  // ex) function () {}
            "named": "always",  // ex) function foo () {}
            "asyncArrow": "always"  // async () => {}
        }],
        'no-return-assign': 0,  //
        'curly': 0, // if {} 를 써야 하는지 여부
        'no-empty-function': 0,
        'quotes': 0
    },
    
};
