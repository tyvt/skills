# 扣分指标占比分析下拉框修复
苏住房G 项目 credit/assessment/components/minusScorePercentage.vue 修复了下拉框宽度不足与缺少 tooltip 的问题。

## 修复内容
- 放宽下拉框宽度：固定220px改为 flex:1; min-width:220px; max-width:480px，可占用标题栏右侧剩余空间
- 增加 tooltip 兜底：新增 selectedAssessmentLabel 计算属性，用 el-tooltip 包裹 zs-select 悬停查看完整检查表名称
- 确保内部组件撑满容器：为 minus-assessment-input 设置 width:100%，补充 :deep 样式使 el-select 跟随外层宽度

## 验证与归属
- 涉及文件：minusScorePercentage.vue、credit/assessment/analysisReport.vue 等
- 所属项目：苏住房G；来源会话：33479cb9-240b-4448-8a64-d699334a5f9c；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "minus_score_fix",
  "source_extraction_id": "b555c8349a924ea8baf9720c753e2722",
  "version": 1,
  "memory_type": "entities"
}
-->