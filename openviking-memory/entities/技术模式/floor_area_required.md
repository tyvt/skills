# 预测建筑面积前端去除必填校验
惠山二期G 后台房产变更与详情页预测建筑面积 predictFloorArea 前端去除 required 校验，后端异常需同步调整。

## 修复方案
- 在 zhi2-web-admin/src/views/building/houseChange/detail.vue 与 house/detail.vue 的 computed.rules 中删除 predictFloorArea 的 required: true 校验。
- 若后端保存仍报空值异常，需同步调整后端的校验规则。

## 当前仍必填项（未改动）
- 项目名称、楼幢号、单元名称、房号、实测建筑面积、物理层、名义层、房屋用途

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证证据：src=惠山二期G/009.md；两个文件均无 linter 报错，页面「预测建筑面积」标签前不再显示红色 *，清空后保存应能通过前端校验
- 涉及文件：zhi2-web-admin/src/views/building/houseChange/detail.vue、zhi2-web-admin/src/views/building/house/detail.vue
- 所属项目：惠山二期G；来源会话：925383ae-ed0a-489f-85a3-b976ba1ec9e0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "floor_area_required",
  "source_extraction_id": "d00549ef770e4e9a930b1734bf53a230",
  "version": 2,
  "memory_type": "entities"
}
-->