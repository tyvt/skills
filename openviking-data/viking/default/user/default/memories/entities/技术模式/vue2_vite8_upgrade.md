# Vue2 项目升级 Vite 8
Vue 2.7.16 + Element UI 2.15.13 项目从 Vite 5.4.11 升级到 8.3.5 需换 Vue2 专用插件并拆分 UnoCSS 依赖。

## 背景与问题
- 本项目需从 Vite 5.4.11 升级到 Vite 8.3.5 并部署到本地 nginx-ui 让用户验证
- @vitejs/plugin-vue 是给 Vue 3 用的，Vue2 项目在 Vite 8 上必须用 vite-ng-plugin-vue2
- UnoCSS 升到 66.12.0 后需显式加 @unocss/core；体积分析插件在 dev/watch 常驻会拖慢启动

## 解决方案
- 子模块 zhi2-web-admin/package.json：vite 5.4.11→8.3.5，改 vite-ng-plugin-vue2，unocss→66.12.0；父仓 package.json 新增 @unocss/core（npm workspaces 根）
- vite.config.js 体积分析插件仅在 report 模式启用，不在 dev/watch 常驻
- src/main.js、SvgIcon/index.vue、Navbar.vue 配合调整，SVG 雪碧图改异步 chunk 不打进首屏
- 部署 nginx-ui 时父仓 env/.env.production 生产加密开关 true→false 重新构建；public/version.json 不入库
- 升级后走「构建→nginx-ui 部署→站点验证」，子模块先提交推送再提交父仓 gitlink

## 验证与归属
- 会话 session-fb4582c6-b616-4504-bf40-24995b916018（基线 a86bf95）用户诉求 1/2/3/4，最终结论列子模块 5 文件 + 父仓 2 文件改动
- 涉及文件：zhi2-web-admin/package.json、vite.config.js、src/main.js、SvgIcon/index.vue、Navbar.vue、package.json、env/.env.production

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue2_vite8_upgrade",
  "source_extraction_id": "03080adbda084b2aac671362ab310a10",
  "version": 1,
  "memory_type": "entities"
}
-->