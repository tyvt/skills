# 产品2.0 查看态带单位数值字段规范
查看态模板字符串手拼单位会让 undefined 变成「undefined㎡」，数值字段必须走 type:'amount' + unit。

## 问题根因
- 物业合同详情页「物业管理区域」占地面积/总建筑面积在数据未维护时显示「undefined㎡」。
- 查看态字段配 type:'text'，页面手动拼 `${this.form.landArea}㎡`；landArea 为 undefined 时拼出非空字符串。
- DetailTemplate 空值判断（非空字符串显示原值）被绕过，永远轮不到「-」占位。

## 解决方案
- 带单位数值字段查看态一律配 type:'amount' + unit:'㎡'（小数位再配 dot:2）。
- 原始数值交给 DetailTemplate 的 getAmountDisplay 处理——空值自动显示「-」、有值时才拼单位。
- 禁止页面侧用模板字符串预拼单位，避免 undefined/undefined㎡ 脏字符串穿透组件判空逻辑。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话结论确认根因是模板字符串拼接在 undefined 时产出非空字符串绕过判空，改为 type:'amount'+unit 交 getAmountDisplay 处理。
- 涉及文件：zhi2-web-admin/src/views/property/propertyContract/components/detail.vue、zhi2-web-admin/src/components/detail-template/detail-template.vue。
- 所属项目：产品2.0；来源会话ID：f3762574-10fb-4d07-adb1-cfcfca9fd8aa；代码基线：401d884。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_unit_undefined",
  "source_extraction_id": "d5c590fa365f4509a81c129f2975f534",
  "version": 1,
  "memory_type": "entities"
}
-->