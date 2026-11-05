# echarts条件编译ESLint报错修复
苏住房C 参考泰兴小程序阳光物业共有资金功能迁移时，修复 echarts-uniapp.vue 因条件编译被 ESLint 判为重复声明的 pre-commit 报错。

## 问题根因
- `echarts-uniapp.vue` 使用 uni-app 条件编译（`#ifdef MP` / `#ifndef MP`），ESLint 无法识别，把两处 `echarts` 声明当成重复定义

## 修复方案
- 新增 `echarts-instance.js`，用单一 `let echarts` 按平台赋值，避免重复声明
- `echarts-uniapp.vue` 改为 `import echarts from './echarts-instance.js'`
- 相关文件 ESLint 已通过，可重新提交

## 涉及文件
- echarts-uniapp.vue
- echarts-instance.js
- 泰兴小程序/src/pages/index/components/complexCard.vue
- 泰兴小程序/src/pages.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：da028f64-66a9-4513-a69a-b729550bf288；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "echarts_eslint_fix",
  "source_extraction_id": "97382b07988845cbb14e671586e0f5f0",
  "version": 1,
  "memory_type": "entities"
}
-->