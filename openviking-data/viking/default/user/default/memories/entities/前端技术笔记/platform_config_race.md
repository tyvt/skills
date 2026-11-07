# 平台配置异步加载竞态误报
园区物管2.0 中依赖 platformConfig 的组件在路由切换时因配置未就绪连发「获取行政区域配置失败」误报，需收敛副作用并根治竞态。
## 现象
- 依赖 platformConfig（如 region）的组件（zs-region-select、zs-search-form 的 isCityLevel、mixins/area.js）路由切换频繁弹「获取行政区域配置失败」，整页刷新后正常。
- computed 里直接 msgError 把「未加载完」当「失败」，且会随依赖变化连弹多条。
## 根因
- App.vue created 里 getPlatformConfig() 异步不等待，platformConfig.region 初始 undefined；页面先渲染并在 computed 做消息提示副作用。
- 刷新后配置往往先于子页面渲染完成，掩盖竞态。
## 解决方案
- computed/created 禁止做消息提示副作用，配置未就绪返回安全默认值，用 watch 在配置到达后同步；提示收敛到 store 层仅缺 region 时提示一次并请求去重。
- 根治：router 首次鉴权时与区域树等数据一起 await getPlatformConfig，保证首屏前配置就绪；残留提示需查后端是否真返回 region 字段。
## 关联信息
- 涉及文件：zs-region-select.vue、zs-search-form.vue、store/modules/app.js、router/index.js、mixins/area.js。
- 所属项目：园区物管2.0；来源会话：a4e30d2e-90bf-4fad-ba71-05964bda5d33；代码基线：49e7729ce。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "platform_config_race",
  "source_extraction_id": "d666360db8d5471ab075b4f725e5c78b",
  "version": 1,
  "memory_type": "entities"
}
-->