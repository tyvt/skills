# 预售现售附件校验与保存不一致修复
苏州市房地产监测V3 项目修复前端校验与后端保存逻辑不一致导致的附件保存失败问题。

## 原因说明
- 界面显示企业共享附件（已上传:1），但未绑定本次申请的临时分组 ID（`applyAttachGroupId`），后端只认当前申请绑定的附件
- 保存前校验读错组件：要件面板外层 `PermitAppendixPanel`，真正存文件列表的是内部 `AnnexUpload`，原校验未读到它

## 已做修复
- 按当前申请的 `busId` 统计有效附件，不把仅展示用的共享附件算作已上传
- 保存前改用 `validateRequired()`，与预售许可申请一致，发请求前拦截提示
- 切换所属项目时重新生成 `applyAttachGroupId` 并提示重新上传要件
- 将 `applyAttachGroupId` 写入 sessionStorage，减少刷新后分组 ID 变化导致附件“丢失”
- 向要件上传传入 `companyId`，避免查询错误

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/views/presale/cashsale`、`cashsaleConstants.js`、`CashsaleDetail.vue`
- 来源会话ID：35305217-34c7-458a-895a-ea7bd968b4b7
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_attachment_fix",
  "source_extraction_id": "446d1dc5ce95440aa4c26ec03a483ac8",
  "version": 1,
  "memory_type": "entities"
}
-->