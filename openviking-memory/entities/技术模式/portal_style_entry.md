# 门户全局样式与骨架屏前置约定
门户 zhi2-web-admin 做骨架屏/动效前需知悉样式入口、主题变量与 anim.scss 未全局注入等工程事实。

## 样式入口与 anim.scss
- 前端代码在子包 zhi2-web-admin（Vue 2.7 + Vite 5 + Element UI + UnoCSS + Sass，非 TS）
- 全局样式唯一入口 src/main.js → @/styles/index.scss，其 @use 汇总 variables.css、mixin、element-ui、ruoyi 等
- anim.scss 未被 index.scss 引用，组件若需用其中 shimmer/wave 须显式 @use "@/styles/anim.scss" as *
- Vite css.preprocessorOptions.scss 无 additionalData，子组件不会自动拿到 mixin

## 主题色与取色
- variables.css 用 CSS 变量（默认 --primary-color: #1677ff）
- 运行时 changeThemeColor() 按 platformConfig.buttonDefaultColor 生成 light/dark 阶梯与 --primary-color-rgb
- 骨架屏应使用 var(--primary-color) / rgba(var(--primary-color-rgb), .1)，不要写死 hex
- views/home/publicPortal/portalTheme.js 另有一套门户展示色，与后台 --primary-color 并存，公共骨架若同时服务两者需分场景取色

## 加载层约定
- 全局 NProgress/v-loading 与页面级骨架是两条线
- 新增「最短展示时间」应在页面/组件层与请求 loading 解耦，避免 axios 拦截器里叠两套遮罩

## 涉及文件与归属
- 涉及 main.js、index.scss、variables.css、anim.scss、utils/index.js、store/modules/app.js、portalTheme.js、vite.config.js、utils/request.js
- 所属项目：门户；来源会话 sess_subagent_agent_f65dec14；代码基线 dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_style_entry",
  "source_extraction_id": "24c50c3f5b784d6182980508c1026f96",
  "version": 1,
  "memory_type": "entities"
}
-->