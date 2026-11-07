# 启用状态开关未垂直居中因表单样式冲突
全局 el-form-item__content 设 min-height 但 el-switch 未居中，通过样式覆盖修复开关垂直居中。

## 问题根因
- 全局 el-form-item__content 设 min-height:38px 但 el-switch 未居中
- section-form label-top 压低高度且栅格 stretch 贴底

## 解决方案
- detail-form.scss 设 align-items:start 并对含开关项内容区 display:flex;align-items:center;min-height:38px
- element-ui.scss 内容区仅含开关时 flex 居中

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：36544904-a945-436e-bd9e-7077b15c8ffc
- 验证证据：cursor 会话 36544904-a945-436e-bd9e-7077b15c8ffc
- 涉及文件：companyAdmin/detail.vue、pubVoucherTemplate/detail.vue、register-form.scss、companyCancel/detail.vue、index.scss、DeveloperBasicInfoDetail.vue、pubBusinessItem/detail.vue、Headline/index.vue
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "switch_not_centered_fix",
  "source_extraction_id": "ceefa154fa254c5592af0cd4cc7071e5",
  "version": 1,
  "memory_type": "entities"
}
-->