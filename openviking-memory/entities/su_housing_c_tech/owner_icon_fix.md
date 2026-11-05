# 电子业主卡图标不显示分包限制修复
苏住房C「我的→电子业主卡」页面图标不显示，根因为微信小程序分包不能引用其他分包静态资源，已通过将资源复制至当前分包修复。

## 问题根因
- 电子业主卡页面在`pages_owner_extra`分包，但图标却从`pages_owner`分包加载(投票选举、投票表决、报事报修、我要出售等导航图标及箭头、背景图)
- 分包页面不能引用其他分包的静态资源，导致图标加载失败

## 修复内容
- 将图标资源复制到当前分包`pages_owner_extra/static/`：owner_nav_1.png、owner_nav_2.png、owner_nav_3.png、jiantou.png、question-dark.svg、szf/Bg.svg
- 更新`pages_owner_extra/ownerCard/index.vue`：`subpackage`从`pages_owner`改为`pages_owner_extra`，背景图/问号图标`resolveStaticUrl`同步调整，用`:deep()`修复图标尺寸样式

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：pages_owner_extra/ownerCard/index.vue
- 来源会话ID：9b333521-93bd-4e07-8e91-b6a53dcd962f

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_icon_fix",
  "source_extraction_id": "32b9912824bb4746851a7d42adfc4d01",
  "version": 1,
  "memory_type": "entities"
}
-->