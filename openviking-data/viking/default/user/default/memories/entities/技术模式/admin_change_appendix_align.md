# 管理员变更详情页附件展示对齐
苏州市房地产监测V3 中将管理员变更详情页附件展示对齐为与预售申请相同的要件宫格样式。

## 问题根因
- 查看态走 `AppendixPackageSection` 独立拉数逻辑，仅 `gridFileList` 非空才渲染宫格，否则显示「暂无附件」
- 编辑态走 `AnnexUpload` 宫格，两者不一致导致查看页易只看到空状态

## 修复内容
- `AppendixPackageSection` 公共组件查看态改用 `AnnexUpload` 只读宫格（`operable=false`），数据与编辑态同一路 `getList`
- 修正 `listAppendixPackage` 请求：不再把 `busId` 误当作 `companyId`
- 编辑/查看共用 `adminType` 受托人要件过滤
- `companyAdmin/detail.vue` 使用 `appendixIsView` / `appendixOperable`，区块标题为「要件上传」

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyAdmin/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：fc3385cc-975c-464a-82e5-9a7c1181eb5d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_change_appendix_align",
  "source_extraction_id": "366a442c32ce460e8f96d6df14fbd0d7",
  "version": 1,
  "memory_type": "entities"
}
-->