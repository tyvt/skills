# 防汛救援审批 DDL 跨环境缺陷
防汛救援（rescue）审批接口在 dev 因 T_FLOOD_RESCUE_LOG.OPERATOR_ROLE 字段长度不足报 500，同款建表脚本在 ST/生产未同步修复会复现。

## 问题现象
- dev 环境 rescue 审批接口报 500，根因是数据库 DDL 字段长度不足，非代码问题
- dev 上将 OPERATOR_ROLE 改为 VARCHAR(64) 后修复，但仅本地 ALTER，建表脚本未改
- ST/生产使用同一份建表 SQL 复制，大概率存在同款列长缺陷，rescue 审批会炸同款 500

## 根因
- 多环境共用同一批建表脚本，某环境 ALTER 修复后未回写脚本，重建或发版时缺陷原样复现
- 缺陷仅在写满长度数据时触发，空数据 E2E 全绿也会上线炸，故「dev 修好」不等于「缺陷闭环」

## 解决方案
- dev 修完 DDL 后立刻把 ALTER 补进仓库建表/迁移脚本，台账记「dev 已修+脚本已补」
- 交付报告显式列出未同步环境（ST/生产）并转后端，不默认代码提交全环境生效
- 发版前按环境做列长/索引对齐核对清单，E2E 补写入长值用例，按字段反查影响面

## 验证与归属
- 来源会话 session-14dff73a-8af9-43c4-b1ed-ab3b342321e2（基线 6156653）结论「收官完成」
- 遗留风险第1条：ST/生产 OPERATOR_ROLE 列长缺陷未同步，建议后端发版前 ALTER
- 涉及文件：zhi2-web-admin/docs/flood/common-errors.md、delivery-2026-10-29.md、e2e-flood-lib.cjs

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rescue_ddl_defect",
  "source_extraction_id": "676b5978950e4a3fbe7a36b00cf074be",
  "version": 1,
  "memory_type": "entities"
}
-->