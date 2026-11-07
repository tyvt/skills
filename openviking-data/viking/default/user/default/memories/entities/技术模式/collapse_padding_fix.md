# Collapse 内容区底部留白修复
苏州市房地产监测V3 项目全局排查并修复了 Collapse 内容区底部留白问题，变更在 `detail-form.scss`。

## 变更说明
- 新增 `.collapse-container > .collapse-content:not(.hide)` 规则，对 `section-form`/`scheme-form-grid` 设 `padding-bottom:0` 与 `row-gap`
- 区域内 `el-form-item` 及 `el-row` 内表单项 `margin-bottom:0`
- 拆分原 `el-form--label-top` 块，增加 `.detail-from-container` 避免只挂 `.detail-container`
- 企业入网/变更备案下办公、资质信息现在命中规则

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源会话：22342137-7680-4a86-9ec8-e4647eb82f33
- 涉及文件：`zhi2-web-admin/src/styles/detail-form.scss`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "collapse_padding_fix",
  "source_extraction_id": "8ac21a9135c44085aa6571c2f9166d98",
  "version": 1,
  "memory_type": "entities"
}
-->
