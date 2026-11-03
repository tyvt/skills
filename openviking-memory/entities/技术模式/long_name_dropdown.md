# 长名称下拉框截断修复
行业管理-物业服务项目检查-分析报表的「扣分指标占比分析」切换检查表时，下拉选中名称被截断，需用弹性宽度+tooltip+内层撑满三件套解决。

## 问题根因
- 下拉框固定 width:220px，长名称必然溢出被省略。
- zs-select/el-select 内层输入区不自动跟随外层宽度变化，仅放宽外层仍显示不全。

## 解决方案
- 外层宽度改 flex:1; min-width:220px; max-width:480px，占标题栏右侧剩余空间但不无限增长。
- 新增 selectedAssessmentLabel 计算属性，用 el-tooltip 包裹 zs-select 悬停看全称，作为截断通用兜底。
- .minus-assessment-input 设 width:100%，补 :deep 样式让内部 el-select 跟随外层宽度。
- 适用面：任何「标题栏/工具栏右侧放承载长文本的下拉」都按弹性宽度+tooltip+内层撑满写，不给死宽度。

## 验证与归属
- 验证证据：会话 33479cb9（基线 a700def）切换检查表名称截断，改后 linter 无报错但构建因环境内存中断未做产物级验证，需人工多档考评切换确认。
- 涉及文件：zhi2-web-admin/src/views/credit/assessment/components/minusScorePercentage.vue、analysisReport.vue、averageScoreAnalysis.vue。
- 所属项目：苏住房G；来源会话ID：33479cb9-240b-4448-8a64-d699334a5f9c；代码基线：a700def

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "long_name_dropdown",
  "source_extraction_id": "b318b5f0cb1c4578bf248ffcf2cf1f85",
  "version": 1,
  "memory_type": "entities"
}
-->