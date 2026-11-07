# 审核端与报送端内容对齐模式
当审核端视图与报送端视图展示同一业务对象不一致时，以报送端为字段与区块的唯一真相源反向对齐审核端，并加 parity e2e 与两端对照截图锁住差异。

## 问题背景
- 审核端（如开业信息确认）与报送端（如开业信息报送）是同一业务对象在不同角色下的两种视图，历史各自维护模板导致字段与区块漂移。
- 审核端缺区块时审核人看不到关键信息（办公信息、租赁经营情况），但测试视角两端都能跑通不报错。

## 解决方案
- 两端不一致时先确定基准端：用户口径「以报送为准」即以申请端（报送端）为字段与区块唯一真相源，反向对齐审核端，不各改一半。
- 对齐需连区块小标题一起对齐，小标题是审核人理解字段的锚点，标题错位比缺字段更易误导。
- 改完加 parity 回归用例（如 e2e/company/lease-opening-audit-parity.spec.js）断言两端区块集合一致，让漂移在 CI 暴露。
- 产出两端对照截图（如 lease-opening-audit-sections.png 与 lease-opening-report-sections.png）入库，作为不一致需求直接验收证据。

## 验证与归属
- 验证证据：会话 session-d8c928e0-e374-4f01-88d4-9a53999d0afb（基线 a86bf95）用户裁决「以报送为准」，提交 fix(lease-open) 含 AgencyEntryNetworkAdminDetail.vue 改动、新增 parity spec、两端截图。
- 涉及文件：zhi2-web-admin/src/views/company/companyRecordAgency/AgencyEntryNetworkAdminDetail.vue、zhi2-web-admin/src/views/zljg/companyRecordAgency/detail.vue、zhi2-web-admin/e2e/company/lease-opening-audit-parity.spec.js。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_report_align",
  "source_extraction_id": "23a9b1295c4141a4940596bbc58ceafc",
  "version": 1,
  "memory_type": "entities"
}
-->