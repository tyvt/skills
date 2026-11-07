# 委托销售详情中的字典键错误
由于键不兼容，委托销售详情页面在显示业务状态字典时失败。

## 描述
- 项目苏州房地产监测V3，前端 zhi2-web-admin。
- entrustSale 详情返回了错误的业务状态字典。

## 解决方案
- 修改 `presale/entrustSale/detail.vue` 中业务状态字典的键为以 `BI` 开头的值，以正确显示。

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/012.md
- 涉及文件: presale/entrustSale/detail.vue; presale/entrustSale/index.vue; supervision/bank/jgwd/detail.vue; main.js; components/detail-template/detail-template.vue; autonomy/repair/detail.vue; mixins/detailMixins.js; utils/dict.js
- 会话: 98dea9b7-0496-43cc-8f46-c865905aa071; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：98dea9b7-0496-43cc-8f46-c865905aa071


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_dict_key",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->
