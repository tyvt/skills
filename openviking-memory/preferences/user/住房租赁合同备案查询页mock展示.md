- 住房租赁合同备案查询页（RentalPages）为演示/联调方便时，可将 data 中 contractResult 初始值设为 rentalContractFixture.result，进入页即展示 mock 备案块（无需先查询）
- 查询成功仍替换结果，失败仍显示橙色未查到提示
- 重置若保持「清空表单并隐藏结果」则与初始 mock 展示冲突；产品若要求重置后仍见 mock 需单独改重置逻辑或预填查询条件
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/RentalPages.vue、zhi2-web-admin/src/views/home/publicPortal/mock/rental.js；所属项目：门户；代码基线：dfee5a6
- 验证证据：contractResult 初始值由 null 改为 rentalContractFixture.result；查询、重置逻辑不变；重置仍会清空表单并隐藏结果区
- 来源会话ID：57f7bcce-4698-4101-aaea-433c7bebf5f6

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "住房租赁合同备案查询页mock展示",
  "source_extraction_id": "fde2f3c3a9b347eeb67adfe354409f63",
  "version": 2,
  "memory_type": "preferences"
}
-->