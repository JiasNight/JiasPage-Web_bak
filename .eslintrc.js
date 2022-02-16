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
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended', // 使用@ typescript-eslint / eslint-plugin中的推荐规则
    'prettier/@typescript-eslint', // 使用eslint-config-prettier禁用一些与Prettier冲突的ESLint规则
    'plugin:prettier/recommended', // 启用eslint-plugin-prettier和eslint-config-prettier，使编辑器显示错误提示，确保这项是扩展数组中的最后一个配置
    'plugin:vue/vue3-strongly-recommended'
  ],
  rules: {
    'prettier/prettier': 'error'
  }

};
