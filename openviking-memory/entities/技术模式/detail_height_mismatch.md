# 详情页高度计算误差致底部白条与滚动遮挡
detail-container 使用 height:calc(100vh - 120px) 比实际可用高度（104px）多 16px 露出底部白条；Headline 未包裹 detail-from-container 致滚动层级错误。

## 问题根因
- detail-container 用 height:calc(100vh - 120px) 比实际可用 104px 多 16px，露出底部白条
- Headline 未包裹 detail-from-container 导致滚动层级错误与 el-table 固定列外溢灰条遮挡

## 修复方案
- index.scss 将详情页改为 height:100% + app-main flex 撑满
- 移除底部多余 padding，operation-btn-group 背景置 #f7f7f7
- 未包裹容器页整页内滚且操作栏吸顶

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/091.md
- 涉及文件：company/institutionRegister/detail.vue、layout/components/AppMain.vue、styles/index.scss、layout/index.vue、OperationBtnGroup/index.vue、Headline/index.vue、styles/detail-form.scss、company/companyApplyAudit/detail.vue
- 来源会话：b69480f5-9aad-43ab-ad88-b4f7ea730209；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_height_mismatch",
  "source_extraction_id": "87e9d6bf8c1143a7a889c7f5c4fbaedd",
  "version": 1,
  "memory_type": "entities"
}
-->