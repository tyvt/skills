# 苏住房C默认图回退双重失效
苏住房C苏找房Tab房源卡片图片无法访问时ZsImage兜底图也不出图，根因为默认图分包未加载与未预加载叠加。

## 问题现象与根因
- 苏找房（主包 pages/index/project）房源卡片图片访问失败显示空白，ZsImage 已配 fallback 却不出默认图
- 默认图 images/szf/default.png 落在 pages_owner 分包，苏找房 Tab 在主包运行且 pages_owner 未加载，回退图路径不可达
- 苏找房 Tab 未在 pages.json 预加载 pages_transaction，即便路径正确默认图也可能未下载完成
- ZsImage 在 src 为 null/空串时未渲染默认图分支，图片直接空白

## 解决方案
- 将 default.png 从 PAGES_OWNER_SZF_FILES 移出，默认解析到 pages_transaction 分包
- houseCard 显式指定 subpackage="pages_transaction"，传入前过滤 null、空串等无效 URL
- ZsImage 加双保险：空/无效 src 直接渲染默认图，加载失败走 @error 回退
- pages.json 给苏找房 Tab 配 preloadRule 预加载 pages_tab + pages_transaction
- pages_owner 内确需本地默认图的页面显式写 subpackage="pages_owner"

## 核心原则
- 默认图必须与使用方同分包或主包，并确认该分包已预加载，否则「回退」是假的

## 验证与归属
- 验证：会话 2d0beecf「苏找房—部分图片不显示，没法访问的图片回退到默认图」
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、src/components/commonNew/houseCard.vue、src/pages_tab/components/Project_Suzhufang.vue、src/pages.json
- 所属项目：苏住房C；来源会话ID：2d0beecf-aa60-4c38-a236-78238bca1303；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "default_image_fallback",
  "source_extraction_id": "a725f791950e4fc49d6298dbdd82d457",
  "version": 1,
  "memory_type": "entities"
}
-->