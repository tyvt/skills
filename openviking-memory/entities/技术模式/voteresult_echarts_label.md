# 最小改动下VoteResult仅留ECharts内置标签
园区物管2.0 VoteResult.vue 回退非必要容器与样式，仅保留 ECharts 防遮挡内置标签配置。

## 改动内容
- 回退非必要容器与样式：去掉 chart-wrapper、min-width、overflow-x，恢复网格
- 仅保留 ECharts 防遮挡配置：label.position = 'inside' 与 labelLine.show = false
- 原有 echarts.use lint 报错非新增，属历史遗留

## 验证与归属
- 验证证据：extracted source=cursor session=54f3b184-cdb6-47a2-9bf5-1daa14edc44c
- 涉及文件：VoteResult.vue
- 所属项目：园区物管2.0；来源会话ID：54f3b184-cdb6-47a2-9bf5-1daa14edc44c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voteresult_echarts_label",
  "source_extraction_id": "addfb2f3b8c345c6ab59dedb2975d7b9",
  "version": 1,
  "memory_type": "entities"
}
-->