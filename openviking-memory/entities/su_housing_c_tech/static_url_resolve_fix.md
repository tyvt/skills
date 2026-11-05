# 渲染层图片路径解析错误修复
苏住房C小程序因 `resolveStaticUrl` 按当前路由误判分包，导致 `images/szf/*` 资源加载500，已按文件名映射修复。

## 问题原因
- 报错文件 `default.png`、`aixin_g.png` 实际在 `pages_transaction/static/images/szf/`，但被解析到 `pages_main/static`
- `images/szf/` 资源分散在 `pages_main`(8)、`pages_owner`(13)、`pages_transaction`(67)
- 原 `resolveStaticUrl` 依当前页面路由推断分包，地图找房页(`pages_main/houseMap`)解析错误

## 修改内容
- 修改 `src/utils/index.js` 按文件名映射到正确分包，不再依赖路由
- 涉及 `src/components/collectBtn/collectBtn.vue`、`ZsImage.vue` 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：7f47849c-ba9e-4b0a-8c84-2445f8137134
- 涉及文件：`src/utils/index.js`、`houseMap.vue`、`ZsImage.vue` 等
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "static_url_resolve_fix",
  "source_extraction_id": "4a5cd770e47e42c0a4dc5f927600c595",
  "version": 1,
  "memory_type": "entities"
}
-->