# 预售许可注销列表文案统一
苏州市房地产监测V3 的 zhi2-web-admin 中将预售许可注销页「所属区域」统一为「行政区划」，并将列表列「开发企业」改为「开发企业名称」。

## 改动内容
- 「所属区域 → 行政区划」已在提交 `3cfc005af` 完成（`permitCancel/index.vue`、`detail.vue` 等），本地 `src` 下已无「所属区域」文案
- 列表表头原先为「开发企业」，与查询条件「开发企业名称」不一致，已改为 `label: '开发企业名称', prop: 'companyName'`
- 若测试环境仍显示旧文案，多为未部署含该提交的前端构建，需重新打包/发布 `zhi2-web-admin`

## 涉及文件
- `zhi2-web-admin/src/views/presale/permitCancel/index.vue`
- `zhi2-web-admin/src/views/presale/permitCancel/detail.vue`
- E2E：`presale-cancel-real-api-flow.spec.js`

## 验证与归属
- 发布后预期：查询区与列表列均为「行政区划、开发企业名称」
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：0e7a87af-ae0c-4d7d-8d25-69a88daa1657；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_column_rename",
  "source_extraction_id": "1ee14cf9ddb149ff99b2da177d5a4b29",
  "version": 1,
  "memory_type": "entities"
}
-->