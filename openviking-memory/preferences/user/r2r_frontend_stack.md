- Semi-Tech 开发的半导体制造 R2R/FDC 前端管理系统（AMS Web，运行时配置为 R2R，项目名 fdc-web）采用 Vue 3.5 + TypeScript + Vite 8 beta 架构，包管理器 pnpm 10.33，要求 Node >= 22.12。
- 框架与构建：Vue Router 5、Pinia 3、Vite 8 beta + vue-tsc 类型检查。
- UI 与样式：Naive UI（devDependency，按需自动导入）+ 自研 @semi-kit/* 组件库；UnoCSS + Less。
- 国际化：vue-i18n + YAML 语言包。
- HTTP 请求：Axios + @vueuse/integrations/useAxios。
- 图表：ECharts 6。
- 工具库：es-toolkit、dayjs、decimal.js、crypto-es。
- 代码规范：ESLint（@antfu/eslint-config）+ Prettier + commitlint + sim。
- 涉及文件示例：config/config.js、main.ts 等。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "r2r_frontend_stack",
  "source_extraction_id": "c98bb9ad779e490497cf208a8aa43df7",
  "version": 2,
  "memory_type": "preferences"
}
-->