- 门户 publicPortal 系列详情弹窗（公司/许可证/房屋等）字段标签默认勿用 text-align: right，用户验收要求标签区左对齐
- 改 .portal-detail-row 与预售用途行 .portal-permit-purpose 的 text-align 为 left
- 房屋详情若未单独设对齐则保持默认左对齐即可
- 验证：会话 2e658f22 修改 PropertyDetailDialog.vue 中 portal-detail-row、portal-permit-purpose 由 right 改 left；代码基线 e1f8e0b；所属项目：门户

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "门户publicPortal弹窗标签对齐方式",
  "source_extraction_id": "434110e2c66e4d3db8aad2ccab492340",
  "version": 1,
  "memory_type": "preferences"
}
-->