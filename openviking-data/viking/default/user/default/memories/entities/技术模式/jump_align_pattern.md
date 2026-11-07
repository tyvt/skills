# 跳转对齐类需求改动面
苏住房G 公共查询楼盘详情中「把 A 跳转改成和 B 一致」类需求需同时改顶部导航、表格空数据链接、目标页 URL 预置默认值。
## 可复用套路
- 顶部导航入口：detail.vue 中「停车位备案」改 parkingSpaceContractFiling/detail，「公共场地备案」改 resourcesLeaseContractFiling/detail。
- 表格空状态链接：zs-table empty 插槽里 parkingTable.vue/venueTable.vue 仍有副本，页面顶部改了表内链接易漏改。
- 目标页 URL 预置：resourcesLeaseContractFiling/detail.vue 支持从 URL 读 contractType，入口须通过 query 显式带入，不能靠硬编码默认。
- 统一口径：跳转均携带 existingFlag:'1'（既有合同维护），与广告位保持一致。
## 判断准则
- 用户说「改成和 X 一样」时，先全文搜索该页面所有跳转入口（顶部按钮、表格行内链接、空状态链接、弹窗内按钮），再逐一对齐，不要只改截图里一处。
## 验证与归属
- 验证证据：会话 f6d71166「这 2 个跳转也改成到租赁合同相关的页面」→ detail.vue 顶部导航 + parkingTable/venueTable 空数据链接三处同改，contractType 通过 URL 传入，统一带 existingFlag:'1'。
- 涉及文件：publicQuery/complex/detail.vue、property/complex/detail.vue、advertiseTable.vue、parkingTable.vue、venueTable.vue、pubHouseTable.vue 等。
- 所属项目：苏住房G；来源会话ID：f6d71166-f8ca-4073-85d2-2fff74a3147a；代码基线：5ccda28

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jump_align_pattern",
  "source_extraction_id": "9af2f036baf34743bd6ba71eed958267",
  "version": 1,
  "memory_type": "entities"
}
-->