# 门户首页二级页面人员名称后icon隐藏改动验证
首页二级页面人员名称后面的 icon 先全部隐藏，该改动经验证 `npx vite build` 通过且 ESLint 报错为改动前既有问题。

## 改动说明
- 首页二级页面人员名称后面的 icon 先全部隐藏

## 验证结果
- `npx vite build` 通过，退出码 0
- 该目录 ESLint 报 19 个错误，均在 `PortalSearch.vue` 与 `mock/properties.js`
- 上述错误为改动前已存在的格式问题，与本次修改文件无关

## 涉及文件
- `PortalSearch.vue`
- `mock/properties.js`
- `src/views/home/publicPortal/portalAssets.js`
- `pages/BrokerPages.vue`
- `components/RentalDetailDialog.vue`

## 归属信息
- 所属项目：门户
- 来源会话ID：session_3c17086fb599b9c34b78df31fd6fad0a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "portal_icon_verify",
  "source_extraction_id": "41b1b4a15e7c4008a54ab7bb826f5e44",
  "version": 1,
  "memory_type": "entities"
}
-->