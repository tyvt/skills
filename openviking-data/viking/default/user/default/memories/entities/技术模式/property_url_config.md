# 阳光物业与公共收益菜单URL配置
苏住房C 小程序「阳光物业」与「公共收益」（入口页标题「共有资金」）子菜单 URL 写死在对应 `index.vue` 的 `menuList` 中，分三层配置。

## 配置说明
- 阳光物业入口页：`src/pages/property/index.vue` 的 `menuList` 定义子菜单（物业服务企业、物业人员等），改 `url` 即可调整跳转
- 公共收益入口页：`src/pages/benefit/index.vue` 类似聚合入口，子菜单 URL 直接写在 `index.vue`
- URL 配置分三层，具体以代码为准

## 涉及文件
- src/pages/property/index.vue
- src/pages/benefit/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：618910fc-72c7-406b-887e-dd852e5e6cf5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_url_config",
  "source_extraction_id": "77dfc578cbe248d99adb47bed2b7e4a2",
  "version": 1,
  "memory_type": "entities"
}
-->