# 首页 V2 布局空白收紧
苏住房G 首页 V2 已收紧关键数据导航与首页第一行的多余空白。

## 修改内容
- 关键数据导航卡片主体下内边距由 `47px` 改为 `24px`，与上内边距一致
- 首页第一行去掉固定高度 `245px` 改为 `auto`，高度随内容收缩
- 可选：将第一行与第二行间 `gap: 14px` 略减需改 `index-v2.vue` 的 `.home-v2` / `.home-v2__row`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：刷新首页即可观察效果
- 涉及文件：`zhi2-web-admin/src/views/home/index-v2.vue`、`zhi2-web-admin/src/views/home/v2/components/KeyDataNav.vue`
- 所属项目：苏住房G；来源会话：4f3ff57b-fe22-4530-b9b8-625675a308b8

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "home_v2_spacing_fix",
  "source_extraction_id": "199270f6de294f5b977b54d6c702ad55",
  "version": 1,
  "memory_type": "entities"
}
-->