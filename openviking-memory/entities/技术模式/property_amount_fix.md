
# 物业合同面积字段显示修复
产品2.0 的 zhi2-web-admin 中物业合同详情页面积字段因手动拼接导致未维护时显示 undefined㎡，已改为 amount 类型。
## 问题原因
- 物业合同详情页「物业管理区域信息」中占地面积和总建筑面积在查看模式用 `type: 'text'` 并手动拼接 `${this.form.landArea}㎡`
- 当 `landArea` 未维护时为 `undefined`，模板字符串变成 `"undefined㎡"`
- `DetailTemplate` 对非空字符串不会显示占位符 `-`
## 修复方案
- 将两个字段改为与同区块其他面积字段一致，使用 `type: 'amount'`，直接传原始数值并配置 `unit: '㎡'`
- `DetailTemplate` 的 `getAmountDisplay` 会在值为空时显示 `-`
## 涉及文件与归属
- 文件：`zhi2-web-admin/src/views/property/propertyContract/components/detail.vue`、`detail-template.vue`
- 项目：产品2.0；来源会话：f3762574-10fb-4d07-adb1-cfcfca9fd8aa；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_amount_fix",
  "source_extraction_id": "b7792fafce8b4fca99fa4738624ecb8a",
  "version": 1,
  "memory_type": "entities"
}
-->
