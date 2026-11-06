# 机构注销详情页附件不显示修复
苏州市房地产监测V3 项目中机构注销详情页（companyCancel/detail.vue）附件不显示问题已修复。

## 问题根因
- 附件 busCode 不匹配：页面用 `company_cancel` 查附件，但菜单 meta 常只配流程用的 `busCode: companyCancel`，查不到配置
- 附件 busId 用错：新增阶段附件挂在 `companyRecordId`，查看时却优先用 `cancelId` 查询，文件对不上
- 缺少 detail 参数：`AnnexUpload` 查询需 `companyId`，未传 `detail` 时回退逻辑不正确
- 顶部「附件」按钮 busCode 错误：`OperationBtnGroup` 抽屉用了流程 `companyCancel` 而非附件专用 `cancelBusCode`
- 查看态展示不清晰：附件藏在「注销信息」里且无独立标题，不易发现

## 修复内容
- `companyCancel/detail.vue` 中 `cancelBusCode` 回退链：`cancelBusCode` → 路由 `busCode` → `companyCancel`
- `appendixBusId` 优先使用 `companyRecordId`（与新增上传时一致）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyCancel/detail.vue`、`companyApply/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：adbe12fc-224d-4313-8f62-cd4fd5541532

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "company_cancel_detail_attachment_not_show",
  "source_extraction_id": "f8bdd9b3412f4342a39559b352c1b670",
  "version": 1,
  "memory_type": "entities"
}
-->