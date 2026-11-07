# 预售转现售详情回填总幢数总户数修复
苏州市房地产监测V3 完成预售转现售详情回填总幢数/总户数的实现，修复详情与选证、选项目逻辑不一致问题。

## 变更内容
- cashsaleConstants.js 新增 mapProjectDisplayFields，统一映射只读展示字段，兼容 buildingCount / houseCount 别名
- CashsaleDetail.vue 的 detailCallback 合并 mapProjectDisplayFields(data)，确保 cashsale detail 返回的幢数/户数能回显
- CashsaleDetail.vue 的 loadTransferPlan 从 /presale/permit/detail 取数后，通过 patchEmptyDisplayFields 补全 form 中空的总幢数、总户数等字段
- CashsaleDetail.vue 的 handlePermitSelect / handleProjectChange 复用同一映射函数，保持选证、选项目与详情加载逻辑一致

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：b85d9888-4202-4fa9-b003-9d507416419b
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：cashsaleConstants.js、CashsaleDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_count_backfill",
  "source_extraction_id": "152541cf03c74c8fbf304040976910c6",
  "version": 1,
  "memory_type": "entities"
}
-->