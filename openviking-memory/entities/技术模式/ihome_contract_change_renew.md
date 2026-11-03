# 变更跳合同新增页续期弹日期选择改租期
iHome 合同详情页点击变更跳转合同新增页，点击续期弹日期选择器改租期。

## 实现要点
- 点击「变更」跳转 /pages-iHome/tenancy?mode=change&id= 进入合同新增页
- 点击「续期」底部弹 wd-datetime-picker，限制最小原结束日、最大10年
- 确定后 mock 更新租期结束日期

## 验证与归属
- 验证：src=0/001.md
- 涉及文件：@src/pages-iHome/my/contractDetail.vue
- 来源会话：7931cd9b-e08f-4f04-aee0-34cbe2c24b5a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ihome_contract_change_renew",
  "source_extraction_id": "2361c55339f146289f8d8bbd184ff68b",
  "version": 1,
  "memory_type": "entities"
}
-->