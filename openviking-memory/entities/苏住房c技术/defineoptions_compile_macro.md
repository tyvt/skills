# Vue 3.2.45 禁用 defineOptions 编译宏
苏住房C（zhi2-mobile-shimin）组件写 `defineOptions({ inheritAttrs: false })` 在微信开发者工具打开页面即崩，报 `ReferenceError: defineOptions is not defined`，因项目 Vue 为 3.2.45 不支持 3.3+ 宏。

## 问题现象
- 组件写 defineOptions 后微信开发者工具打开页面即白屏，报 `ReferenceError: defineOptions is not defined`，堆栈落在 weapp:///components/ZsMap/ZsMap.js 的 setup
- 页面整块白屏，非组件逻辑错误

## 根因
- 项目 Vue 版本为 3.2.45，而 `defineOptions` 是 3.3+ 才提供的编译宏
- uni-app/Vue3 web 端构建里宏会被编译器吸收，但当前版本编译器不识别，宏原样落到运行时代码，setup 执行时找不到标识符

## 解决方案
- 删掉 defineOptions，改成不带 setup 的独立 `<script>` 块 `export default { inheritAttrs: false }`，与项目内 ZsPaging.vue 惯例一致
- 语义不变：仍禁止 attrs 自动透传，组件内手动把 class/style 绑到真实节点
- 排查同类「未定义」报错时，先确认语法/宏是否超出项目 Vue 版本，再怀疑代码
- 改完需重新构建并刷新开发者工具，热更新对编译宏改动不生效

## 验证与归属
- 会话 7b29aae4：用户贴 ReferenceError at setup (ZsMap.js:45:5)，结论为 Vue 3.2.45 不支持 defineOptions，按 ZsPaging.vue 改为独立 script 导出 inheritAttrs: false
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/components/ZsPaging/ZsPaging.vue、package.json；所属项目：苏住房C；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "defineoptions_compile_macro",
  "source_extraction_id": "f9c3a7f4992547a18e59f7352998fcc3",
  "version": 1,
  "memory_type": "entities"
}
-->