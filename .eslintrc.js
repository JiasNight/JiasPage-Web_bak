module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser', // 指定ESLint解析器
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: 'module' // 允许使用导入
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'], // 表示 eslint-config-prettier
  extends: [
    './.eslintrc-auto-import.json',
    'eslint:recommended', // 继承Eslint中推荐的（打钩的）规则项http://eslint.cn/docs/rules/
    'plugin:vue/essential', // 此项是用来配置vue.js风格
    'prettier' // 把prettier中设置的规则添加进来，让它覆盖上面设置的规则。这样就不会和上面的规则冲突了，表示 eslint-plugin-prettier，需要放到最后以覆盖别的规则
  ],
  rules: {
    // off | 0 :表示关闭规则。
    // warn | 1 :表示将该规则转换为警告。
    // error | 2 :表示将该规则转换为错
    // 'prettier/prettier': 1, //使用prettier
    semi: [2, 'always'], // 语句强制分号结尾
    quotes: [2, 'single'], // 引号类型''
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['index'] // 需要忽略的组件名
      }
    ],
    'no-unused-vars': 0,
    'no-var': 2,
    'no-alert': 0, // 禁止使用alert
    'no-console': 2, // 禁止使用console
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-debugger': 2, // 禁止使用debugger
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-extra-semi': 2, // 禁止多余的冒号
    'no-undef': 0,
    'no-multi-spaces': 1 // 不能用多余的空格
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', './src']
      }
    }
  }
};
