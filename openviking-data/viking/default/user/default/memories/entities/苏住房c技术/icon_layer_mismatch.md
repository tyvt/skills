# 宫格图标单层/双层素材渲染不匹配
苏住房C小程序「我要买房」宫格中「地图找房」图标不显示或裂图，根因是后台双层素材结构与前端单层渲染组件不匹配，而非 URL 路径错误。

## 现象与根因
- 同一图标在「苏找房」区域显示正常，在「我要买房」宫格裂图/空白，两条配置 iconPath/bgPath/url/isShow 完全一致且 curl 均 HTTP 200
- 普通宫格 iconPath 为 6~7KB「背景+图标一体」大图、bgPath 为空；地图找房复用苏找房双层素材：iconPath 约 1.6KB 白色小图标，bgPath 约 4.9KB 圆形底色
- 苏找房 HomeNavItem 同时渲染 MenuImage(bgPath,aspectFill)+MenuImage(iconPath,aspectFit)；MidModuleGrid 只渲染 iconPath(aspectFit) 贴固定灰底 #eceef9，故裂图

## 解决方案
- 优先改前端：宫格组件检测到 bgPath 存在时按 HomeNavItem 方式叠两层（底图 aspectFill + 图标 aspectFit 绝对居中）
- 不要逐个改后台配置，同一 url/编码在两模块共用，改一处会连带另一模块
- 远程地址端口易被看错（如 8887），排查必须自己 curl 复核而非凭肉眼读配置

## 验证与归属
- 会话 66cc6474：对比 navigation.home 与 navigation.mid 地图找房，iconPath/bgPath/url/isShow 一致且 curl 200；文件大小 6507/6582(单层) vs 1633+4924(双层)
- 涉及文件：MidModuleGrid.vue、HomeNavItem.vue、Home_Suzhufang.vue、MenuCard.vue；代码基线 4d6dba9

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "icon_layer_mismatch",
  "source_extraction_id": "81652a109a2b411098a21d593e97f48f",
  "version": 1,
  "memory_type": "entities"
}
-->