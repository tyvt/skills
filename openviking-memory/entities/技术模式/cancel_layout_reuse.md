# 注销信息布局复用基本信息栅格与间距规范
companyCancel/detail.vue 中「注销信息」原与「基本信息」卡片间距缺失且栅格不一致，已复用基本信息栅格与间距规范。

## 问题根因
- companyCancel/detail.vue 中「注销信息」与「基本信息」卡片间距缺失
- 栅格不一致

## 解决方案
- 新增 .company-basic-info-form + .collapse-container { margin-top: 12px }
- 编辑态改用 section-form 栅格：注销时间 `.section-field` 半宽、原因附件 `.section-field--full` 整行、控件 `width:100%`、768px 下列
- 查看态 layout 由 THIRD_LAYOUT 改为 HALF_LAYOUT 并移除该常量

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/278.md（另见 leftover/078.md）
- 涉及文件：companyCancel/detail.vue、Headline/index.vue、CompanyBasicInfoForm.vue、companyApply/detail.vue、detail-template.vue、companyApplyAudit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：e29a66b7-c226-49ac-b501-5a592c4091f8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_layout_reuse",
  "source_extraction_id": "c8b2ccc826f04b5795a9822e8b7419bd",
  "version": 2,
  "memory_type": "entities"
}
-->