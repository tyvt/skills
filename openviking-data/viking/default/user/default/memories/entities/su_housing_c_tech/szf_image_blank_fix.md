# 苏找房列表图片空白修复
苏住房C小程序苏找房列表图片无法访问时显示空白，因默认图分包路径错误与分包未预加载，已修复。

## 问题根因
- 默认图分包路径错误：`images/szf/default.png` 映射到 `pages_owner` 分包，而苏找房 Tab 在主包（`pages/index/project`），未加载 `pages_owner` 时回退图无法显示
- 分包未预加载：苏找房 Tab 未预加载 `pages_transaction`，即使路径正确默认图也可能尚未下载

## 修改内容
- `utils/index.js`：将 `default.png` 从 `PAGES_OWNER_SZF_FILES` 移除，默认解析到 `pages_transaction`
- `houseCard.vue`：指定 `subpackage="pages_transaction"`，并过滤无效图片 URL（null、空字符串等）
- `ZsImage.vue`：空/无效 `src` 直接显示默认图；加载失败时通过 `@error` 回退
- `pages.json`：苏找房 Tab 预加载 `pages_tab` + `pages_transaction`

## 涉及文件
- 涉及文件：`utils/index.js`、`houseCard.vue`、`ZsImage.vue`、`pages.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：2d0beecf-aa60-4c38-a236-78238bca1303

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "szf_image_blank_fix",
  "source_extraction_id": "881586bec5ef4745b92508ce244b74a9",
  "version": 1,
  "memory_type": "entities"
}
-->
