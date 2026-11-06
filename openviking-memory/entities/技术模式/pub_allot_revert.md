# 资金拨付无合同申请需求回滚
苏住房G 项目 zhi2-web-admin 子模块回滚「资金拨付支持无合同申请」相关改动。

## 回滚内容
- 回滚提交 d0ca9657f5（feat(pubAllotNotice): enhance form fields for contract management）
- detail.vue 去掉「是否有合同」分支，恢复先选支出合同、用款申请由合同带出原流程
- index.vue 去掉「是否有合同」筛选项，恢复「用款申请号」查询
- 保留 4b23557b4（bug 5236）中 biz_state 字典修复未动

## 子模块状态
- 子模块提交 1b8d60d Revert 对应改动
- 父仓库 zhi2-web-admin 子模块指针已变尚未提交

## 验证与归属
- 所属项目：苏住房G；来源会话：5e0541e9-3a3b-4fc6-ac02-908632628340
- 涉及文件：pubAllotNotice/detail.vue、pubAllotNotice/index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_allot_revert",
  "source_extraction_id": "430454bfe60c45a1a179cfb3e392ff41",
  "version": 1,
  "memory_type": "entities"
}
-->