# 查看态数值单位amount
产品2.0 查看态模板字符串手拼单位会让 undefined 变成「undefined㎡」，数值字段必须走 type:'amount' + unit。

## 问题现象
- 物业合同详情页「物业管理区域」占地面积/总建筑面积数据未维护时显示「undefined㎡」。
- DetailTemplate 空值判断被绕过，永远轮不到「-」占位。

## 根因
- 查看态字段配 type:'text'，页面手动拼接 `${this.form.landArea}㎡`。
- landArea 为 undefined 时拼出非空字符串，组件判空逻辑被穿透。

## 解决方案
- 带单位数值字段查看态一律配 type:'amount' + unit:'㎡'（需小数位配 dot:2），交给 DetailTemplate 的 getAmountDisplay 处理。
- 值为空自动显示「-」、有值时才拼单位。
- 禁止在页面侧用模板字符串预拼单位，避免脏字符串穿透判空。

## 验证与涉及
- 验证证据：会话结论根因是模板字符串拼接在 undefined 时产出非空字符串绕过判空；改为 type:'amount' + unit:'㎡' 交 getAmountDisplay 统一处理。
- 涉及文件：zhi2-web-admin/src/views/property/propertyContract/components/detail.vue；zhi2-web-admin/src/components/detail-template/detail-template.vue
- 所属项目：产品2.0
- 来源会话ID：f3762574-10fb-4d07-adb1-cfcfca9fd8aa
- 代码基线：401d884

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "查看态数值单位amount",
  "source_extraction_id": "647993624cef4e3d9a4df769152b268d",
  "version": 1,
  "memory_type": "entities"
}
-->
