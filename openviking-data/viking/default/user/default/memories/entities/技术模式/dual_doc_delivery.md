# 防汛交付双文档收口规范
防汛模块联调踩坑用 common-errors.md 台账编号记坑，delivery 报告显式列未验证遗留项，两者职责不同。

## 文档分工
- common-errors.md 作台账，每条坑编号入账（本次条目12–15），沉淀可复用踩坑知识
- delivery-2026-10-29.md 作交付报告，逐项写状态/证据/遗留/未验证项，明确本次交付边界

## 关键纪律
- 未验证项不藏：遗留必须显式列明并注「未验证」而非「已完成」
- 遗留要归属到人/团队（网关缺陷归网关侧、DDL ALTER归后端发版前），不只写待修复

## 格式要求
- 台账条目格式：现象→根因→定位法→修法→影响范围→是否跨环境同步（DDL类必标）
- 交付报告分四块：收官完成表、证据、遗留风险、复盘一句话；台账同类可引用同编号

## 验证与归属
- 来源会话 session-14dff73a（基线6156653）台账条目12–15入 common-errors.md，交付报告专节列未验证项
- 遗留含 ST/生产DDL未同步、网关 zs-method:delete 缺陷（台账条目4）、4张历史脏单据
- 涉及文件：zhi2-web-admin/docs/flood/common-errors.md、delivery-2026-10-29.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dual_doc_delivery",
  "source_extraction_id": "676b5978950e4a3fbe7a36b00cf074be",
  "version": 1,
  "memory_type": "entities"
}
-->