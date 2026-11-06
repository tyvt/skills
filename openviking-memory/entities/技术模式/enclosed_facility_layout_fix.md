# 「封闭设施」区块三列布局修复
苏州市房地产监测V3 修复「封闭设施」区块位置字段误设为 FORM_COL_WIDE（占 2 列）导致看起来像两列布局的问题。

## 修复内容
- 展示态（DetailTemplate）：主入口位置、次入口位置、监控设备位置改回默认三列（span=8），仅「其他情况」保留整行
- 编辑态：去掉 zs-form-col wide，6 个普通字段按三列排列（每行 3 个）
- DetailTemplate 列宽：getItemStyle 按 span 固定宽度（8→33.3%，16→66.7%，24→100%），避免行内字段被错误拉伸

## 布局预期
- 基本信息第1行：项目编号/项目名称/行政区域；第2行：项目坐落/开发企业/（空）
- 封闭设施第1行：小区主入口/主入口位置/小区次入口；第2行：次入口位置/值班室/监控设备位置；第3行：其他情况（整行）

## 验证与归属
- 涉及文件：Headline/index.vue、detail-template.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：8b5d2426-e5c8-4a9a-a656-5be3baa67278；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "enclosed_facility_layout_fix",
  "source_extraction_id": "aecd5ccb4e0e42769b1470cec6b4862f",
  "version": 1,
  "memory_type": "entities"
}
-->