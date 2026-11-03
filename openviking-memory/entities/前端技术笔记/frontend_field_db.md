# 前端字段名以数据库表结构为准
修复字段时应查达梦 all_tab_columns 拿到真实列，砍掉前端自造的 ID/CODE 参数只留 NAME 列。

## 问题背景
- 禅道 2162 要求按后端给的字段修复；前端原用 `supervisionBankName` 还自造 `supervisionBankId/Code` 状态与提交参数
- 核实达梦测试库：`SYS_BANK_BRANCH` 与 `PUB_REGULATORY_AGREEMENT` 只有 `SUPERVISION_BANK_BRANCH_NAME` 一列，无 ID/CODE 列
- 自造 id/code 会提交脏数据，且为自洽写反查 ID 兜底逻辑徒增分支

## 解决方案
- 先查库拿铁证：`SELECT column_name FROM all_tab_columns WHERE table_name='...'`（达梦）确认实际列
- 字段改名全量替换 `supervisionBankName` → `supervisionBankBranchName`（3 文件：benefit/pubRegulatoryAgreement/detail.vue、system/sysBankBranch/detail.vue、system/workBank/components/pubRegulatoryBranchDialog.vue）
- 顺手删掉前端自造 id/code 状态与提交参数，只提交 name
- 必须保留的历史兼容写明兜底（如开户行账户兜底兼容旧 `row.supervisionBankName`）
- 改完按 prop/rules/v-model/getForm 四层 grep 核对 9 处键名对齐，再加 node 语法检查与 lint-staged eslint --fix

## 验证与归属
- 验证：会话 session-07a67f50-976b-4f8b-9852-d834ed53c453（基线 6156653）最终结论「字段对齐交付」表
- 涉及文件：上述三个 .vue 文件
- 来源会话ID：session-07a67f50-976b-4f8b-9852-d834ed53c453；代码基线：6156653


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "frontend_field_db",
  "source_extraction_id": "e19e710c9628480f994e16c17d092217",
  "version": 1,
  "memory_type": "entities"
}
-->