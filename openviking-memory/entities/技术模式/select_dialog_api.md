# 业务选择弹窗专用过滤接口模式
园区物管2.0 中带业务前置条件的选值弹窗必须走业务专用可选列表接口，不能复用通用列表接口在前端筛选。

## 问题根因
- 房屋质量保证金协议新增页「选择物业管理区域」弹窗调用通用接口 /property/complex/page，列出所有已备案区域，包含尚未开立保证金账户的区域，业务不允许选择。
- 通用列表接口只承载全部备案数据，业务约束（如已开户）是后端才知道的过滤条件，前端筛选既不可靠也不完整。

## 解决方案
- 带业务前置条件的选值弹窗优先向后端要/查专用可选列表接口：本项目用 /maintenance/guaranteeDepositAgreement/pageOptionalComplex，只返回已开立账户的物业管理区域。
- 在 SelectDialog.open 里直接把 url 换成专用接口，筛选参数（bizState: '2'、当前项目 complexId）按接口约定传，表格列配置保持不变。
- 同类模式：可选项 = 主数据 + 业务状态约束时，一律走 *Optional* / *CanUse* 类专用接口。

## 验证与归属
- 验证：会话 70fffb2b 用户报「未完成开户的物业管理区域也显示了」，根因是弹窗调了 /property/complex/page，修复把 SelectDialog.open 的 url 改为 /maintenance/guaranteeDepositAgreement/pageOptionalComplex。
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue；所属项目：园区物管2.0；来源会话：70fffb2b-1949-40f5-a6e2-10d76989883b；代码基线：c52866fc8。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_api",
  "source_extraction_id": "5ed8cff3af8a4f5db9f4d3e49a2b2037",
  "version": 1,
  "memory_type": "entities"
}
-->