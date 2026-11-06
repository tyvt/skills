# 全局 dialog picker 放大镜图标修复
苏州市房地产监测V3 项目新增 CI 检查脚本并批量补齐 zs-input 弹窗选择的放大镜图标。

## CI 检查
- 新增 scripts/check-dialog-picker-suffix-icon.mjs
- 规则：zs-input 带 @focus 弹窗选择时必须有 suffix-icon="el-icon-search"（排除 Dialog 内「请输入关键字」、GIS/地图等）
- 已挂到 npm run lint → check:dialog-picker-suffix

## 批量修复
- 自动补齐 56 处放大镜图标（全库扫描约 58 处，其余为排除项或已合规）
- node scripts/check-dialog-picker-suffix-icon.mjs 已通过

## 存量房细节对齐
- 免监管协议 agreementExempt/detail.vue：监管机构名称增加 suffix-icon + readonly
- 监管账户注销 accountCancellation/detail.vue 同步增加 suffix-icon
- 监管账户 account/detail.vue 同步增加 suffix-icon

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：scripts/check-dialog-picker-suffix-icon.mjs、agreementExempt/detail.vue、accountCancellation/detail.vue、account/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：b9e1a88a-1413-48f8-9089-482054877b8a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_suffix_fix",
  "source_extraction_id": "690db916035b49d8a2baa74ec2c78899",
  "version": 1,
  "memory_type": "entities"
}
-->