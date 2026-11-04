# 业委会启用状态取committeeState字段
「业委会状态」列「启用」取自接口字段 committeeState，经字典 IS_START 转换（1绿0红），配置于 IndustryRecord 列表，空值不显示标签。

## 字段与字典
- 「业委会状态」列的「启用」状态来自接口字段 `committeeState`
- 经字典 `IS_START` 转换：`1` 显示绿色，`0` 显示红色
- 配置于 `zhi2-web-admin/src/views/autonomy/change/industry/index.vue` 的 `IndustryRecord` 列表
- 空值不显示标签

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/change/industry/index.vue、zhi2-web-admin/src/views/autonomy/record/components/index.vue
- 所属项目：产品2.0；来源会话：eebfec63-b202-465d-bb64-bb589b6deaf9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "committee_state_display",
  "source_extraction_id": "61bcf916e961454588f66fa839204bbe",
  "version": 1,
  "memory_type": "entities"
}
-->