# 电子业主卡右侧图片显示修复
苏住房C小程序电子业主卡右侧图片因Android写死与H5远程加载失败而不显示，已改用本地静态图修复。

## 问题根因
- Android：`item_my_card.xml`右侧图片写死`@drawable/icon_card`，`CardAdapter`不从接口读`iconPath`
- H5：使用`MenuImage`+接口`iconPath`，远程地址在WebView可能加载失败；本地fallback经`resolveMediaUrl`二次处理路径可能改错；`menu.js`指向错误`icon-owner-card.png`（首页小图标）

## 修复内容
- 复制Android的`icon_card.png`到`pages_tab/static/images/my/owner-card.png`（约56KB）
- `MenuSection.vue`卡片右侧改用`tabStaticUrl`本地图片，与头部背景图同方式，不再走`MenuImage`
- `menu.js`电子业主卡统一使用`images/my/owner-card.png`，不依赖接口远程图标

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`item_my_card.xml`、`MenuSection.vue`、`menu.js`
- 来源会话ID：d6842107-6287-4385-849e-b409c4545d53；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "owner_card_image_fix",
  "source_extraction_id": "1d5777e127fe4ad7ad19ecf01a6caf1e",
  "version": 1,
  "memory_type": "entities"
}
-->