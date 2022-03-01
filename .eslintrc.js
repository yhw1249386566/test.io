module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        quotes: [2, 'single'], //单引号
        'no-lone-blocks': 0, //禁止不必要的嵌套块
        'no-duplicate-case': 2, //switch中的case标签不能重复
        'no-dupe-args': 2, //函数参数不能重复
        'no-undef': 0, //不能有未定义的变量
        'no-use-before-define': 2, //未定义前不能使用
        'react/no-deprecated': 2, //不使用弃用的方法
        'no-unreachable': 2, //不能有无法执行的代码
        'react/jsx-key': 1, //在数组或迭代器中验证JSX具有key属性
        'no-var': 2, // 禁止使用 let 或 const 而不是 var
        'react/react-in-jsx-scope': 0,
    },
}
