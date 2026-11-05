# 物业合同备案面积字段空值显示修复
淮安物管物业合同备案详情页占地面积等字段为空时误显示 `undefined㎡`，已修复为占位符 `-`。

## 问题根因
- `property/propertyContract/components/detail.vue` 的「占地面积」「总建筑面积」在 `contentInfo` 使用模板字符串 `${this.form.landArea}㎡`。
- 接口返回 `landArea: null` 时转成字符串 `"undefined"`，显示为 `undefined㎡`。

## 修复方案
- 改为与同页其他面积字段一致，使用 `type: 'amount'`，直接传 `this.form.landArea` / `this.form.totalFloorArea`。
- `detail-template` 的 `getAmountDisplay` 对空值显示 `-`，有值时格式化并拼接 `㎡`。
- 修改文件：`zhi2-web-admin/src/views/property/propertyContract/components/detail.vue`、`src/components/detail-template/detail-template.vue`。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：1d686e0a-d458-44a4-bb4f-d49a87fb35e2
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_null_display",
  "source_extraction_id": "766cfeab02434f30a55a13c9314916f3",
  "version": 1,
  "memory_type": "entities"
}
-->