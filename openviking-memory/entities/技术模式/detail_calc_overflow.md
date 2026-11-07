# 详情容器高度溢出致底部白条与灰条
苏州市房地产监测V3 的 zhi2-web-admin 中 detail-container 使用 calc(100vh - 120px) 多出 16px 导致底部白条，未包裹 detail-from-container 的 Headline 滚动层级错误且 el-table 固定列外溢造成灰条。

## 问题根因
- detail-container 使用 height: calc(100vh - 120px) 比实际可用区域多 16px 导致底部白条
- 未包裹 detail-from-container 的 Headline 滚动层级错误
- el-table 固定列外溢造成灰条遮挡

## 修复方案
- index.scss 改为 height:100% + app-main flex 撑满
- 操作栏 operation-btn-group 背景 #f7f7f7
- 未包裹页整页内滚且操作栏吸顶

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/146.md
- 涉及文件：company/institutionRegister/detail.vue、layout/components/AppMain.vue、styles/index.scss、layout/index.vue、components/OperationBtnGroup/index.vue、components/Headline/index.vue、styles/detail-form.scss、company/companyApplyAudit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：b69480f5-9aad-43ab-ad88-b4f7ea730209；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_calc_overflow",
  "source_extraction_id": "38960cc9508a40a19b9c3ec07e6c4353",
  "version": 1,
  "memory_type": "entities"
}
-->