# 住房租赁备案查询页默认展示 mock 结果
住房租赁合同备案查询页进入时底部直接展示 rentalContractFixture 的 mock 备案结果，无需先查询。

## 修改内容
- RentalPages.vue 中 contractResult 初始值由 null 改为 rentalContractFixture.result
- 出租方方兆玉、承租方杨佩芳、租期、租金等 mock 数据直接展示

## 保持逻辑
- 查询、重置逻辑不变；查询失败仍显示橙色「未查询到合同备案信息」
- 查询成功替换下方结果；点「重置」清空表单并隐藏结果区

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/RentalPages.vue、mock/rental.js
- 所属项目：门户；来源会话：57f7bcce-4698-4101-aaea-433c7bebf5f6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_contract_mock",
  "source_extraction_id": "7779062f47aa4113bae1c0d272741bd0",
  "version": 1,
  "memory_type": "entities"
}
-->