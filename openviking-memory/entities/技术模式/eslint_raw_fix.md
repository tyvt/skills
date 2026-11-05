# 园区物管2.0 ESLint 无法解析 Vite ?raw 导入
园区物管2.0 中 pre-commit 的 ESLint `import/no-unresolved` 规则无法解析 Vite 的 `?raw` 导入（如 `apply.svg?raw`），导致提交失败。

## 问题原因
- ESLint 的 `import/no-unresolved` 把 `xxx.svg?raw` 当成文件名解析，而非 Vite 特殊导入语法，误报未找到模块
- 并非文件缺失，是静态分析工具不识别 Vite `?raw` 后缀

## 解决方案
- 在导入处加 `// eslint-disable-next-line import/no-unresolved` 行内禁用该规则
- 已在 `fundPanorama/index.vue` 应用并通过本地 ESLint 校验
- 重新提交时需将 `apply.svg` 与 `index.vue` 一并加入暂存区

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、src/assets/images/mapOverview/apply.svg、eslintrc.cjs、package.json
- 所属项目：园区物管2.0；来源会话：ef34d9ad-7535-4fd3-a353-b17efa7397bf

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eslint_raw_fix",
  "source_extraction_id": "e290f9ca93584316ad96adb46810389a",
  "version": 1,
  "memory_type": "entities"
}
-->