# 业主合同页卡片间距修复
苏住房C小程序中`contracts.vue`合同信息与收费标准间距未生效，已用`:deep()`穿透scoped修复。

## 问题原因
- `margin-top:10px`写在父页面scoped样式，但`base-card`是子组件，普通选择器无法作用到子组件根节点
- 间距未生效

## 修改内容
- 使用`:deep()`穿透scoped，与同页`file-list`保持一致
- 对`.contract_card_item`和`.fee_card_item`设置`margin-top:10px`等
- 两卡片间出现10px灰色间距

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`contracts.vue`、`baseCard.vue`、`index.vue`
- 来源会话ID：9fcef1ba-4f8b-422b-b728-7de7e7801513

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "contracts_spacing_fix",
  "source_extraction_id": "72981d96a43e4556801acb220899f2b0",
  "version": 1,
  "memory_type": "entities"
}
-->