# 详情标签左对齐全局修复
苏州市房地产监测V3 中移除了写死的 labelAlign:'right'，统一走 DetailTemplate 默认左对齐。

## 修改内容
- 全库仅 2 个文件写死 labelAlign:'right'，已全部删除
- AgencyBranchDetail.vue：basicInfoView 与 cancelInfoView（注销时间、注销原因）移除该属性
- AgencyPersonnelDetail.vue：basicInfoView 基本信息、个人证件照、备注均移除 labelAlign:'right'
- 字段配置现与 agencyBasicInfoContent.js 一致，统一左对齐

## 验证结果
- 全库已无 labelAlign:'right' 残留，无新增 linter 错误
- 刷新分支机构信息详情和从业人员信息详情后标签左对齐
- 编辑态表单 label-position="right" 未改动（按计划可选项）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyBranchDetail.vue、AgencyPersonnelDetail.vue、agencyBasicInfoContent.js、detail-template.vue
- 所属项目：苏州市房地产监测V3；来源会话：c4eb806c-2a5f-4658-851d-043e02be26a0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_detail_label_align",
  "source_extraction_id": "532c5184418545dea132530ce12ccb1a",
  "version": 1,
  "memory_type": "entities"
}
-->