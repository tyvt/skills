# 业主房屋详情页撤销按钮宽度修复
苏住房C `pages_owner/house/detail.vue` 的「撤销添加」按钮因无效 `long` 类而显示过窄，已改用 `block` 属性修复。

## 问题原因
- 「撤销添加」按钮使用 `class="button long"`，项目无 `.long` 样式
- `ZsButton` 默认按文字宽度收缩，flex 居中下显得很窄

## 修复内容
- 去掉无效 `long` 类，改用 `ZsButton` 自带 `block` 属性，按钮占满容器宽度
- 修改位于 `pages_owner/house/detail.vue` 的 `<ZsButton ... block class="button">撤销添加</ZsButton>`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_owner/house/detail.vue`、`tenant_detail.vue`、`pages_owner/house/index.vue`
- 所属项目：苏住房C；来源会话ID：064ec0fb-85a5-4024-bd90-76afedcd4945；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "house_btn_fix",
  "source_extraction_id": "10da4203cded4af8a50dcda2490f11c8",
  "version": 1,
  "memory_type": "entities"
}
-->