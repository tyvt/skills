# 关联房屋详情分页改造
苏州市房地产监测V3 完成记录详情弹窗「关联房屋详情」分页改造。

## 主要改动
- LimitRecordDetailDialog.vue 新增 houseQuery、houseTotal、houseLoading 及请求序号防竞态
- 新增 loadHouseList() 按单据类型分流接口：限制记录 → POST /building/houseLimit/page；解除限制 → POST /building/houseLimit/pageLimitRemoval
- 表格增加 v-loading、跨页连续序号 houseIndex，下方增加 zs-pagination
- 修正 handleOpen 移除错误 res.rows → detail 赋值；修正 involveLimitCount 优先用 record.involveLimitCount / limitQty

## 涉及文件
- LimitRecordDetailDialog.vue、house-limit-helpers.js、house-limit-list-detail.spec.js
- 路径：zhi2-web-admin/src/views/building/houseLimit/components/ 等

## 归属
- 项目：苏州市房地产监测V3；来源会话ID：cd7841a6-c968-4a76-a569-14a7318e6fb3

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_limit_detail_pagination",
  "source_extraction_id": "c002564f850c4da795d9ca098fc59f02",
  "version": 1,
  "memory_type": "entities"
}
-->
