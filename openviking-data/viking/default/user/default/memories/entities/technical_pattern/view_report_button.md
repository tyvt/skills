# 跨系统查看报告按钮显隐契约
园区物管2.0 业务列表/详情增加跳转收益系统「查看报告」按钮，需控制显隐且逻辑公共化。

## 显隐契约
- 报告能力由独立 benefit 服务承载，服务不可用或单据未生效（bizState≠2）时入口必须隐藏
- 按钮 visible 是行级函数而非静态布尔：visible: (row) => this.showBenefitService && row.bizState == 2（用 == 兼容数字 2 与字符串 '2'）

## 公共化套路
- 查看报告接口调用与打开 PDF 逻辑抽成公共方法，以 serviceName 作为入参供多模块复用
- 按钮对象结构：{ label, permission:false, function, visible, attrs }

## 验证与归属
- 验证：property/complex/index.vue 198-206 行最终代码 visible: (row) => this.showBenefitService && row.bizState == 2，serviceName 作为入参公共方法改造
- 涉及文件：zhi2-web-admin/src/views/property/complex/index.vue、benefit/statisticsMap/overviewContent.vue
- 所属项目：园区物管2.0；代码基线 b2b559778；来源会话 1b92a0cf-a249-44ed-8964-a48e6fb7b46f

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "view_report_button",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 2,
  "memory_type": "entities"
}
-->