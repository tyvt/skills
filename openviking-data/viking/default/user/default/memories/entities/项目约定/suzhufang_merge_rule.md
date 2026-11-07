# 苏住房G 跨分支合并冲突处置约定
苏住房G项目将上游 develop/v2.6.2 合入分叉分支 develop/v2.6.2-suzhufang 时的冲突处理口径。
## 处置规则
- 纯业务逻辑冲突（约15个文件如 complexFieldConfig.js、zs-advanced-query.vue、spFeeBill/discountDialog.vue、property/bill/components/detail.vue、property/bill/components/index.vue）：整体以 HEAD（suzhufang 分支）为准。
- 纯 Bug 修复（如 serviceItem/detail.vue 服务内容表格展示）：以上游版本为准。
- 两边均有实质改动（index.scss、property/complex/index.vue、spFeeBill/index.vue、platformConfig/detail.vue）：逐 hunk 拼合而非整文件二选一。
## 原因与收尾
- 项目为苏住房分叉版，业务字段与流程已本地化，吃上游会改回本地业务；上游 bug 修复常同源且不涉及业务语义。
- 约40+无冲突文件通用修复自动并入；子模块提交（本例 c828f7ebf）后需单独更新父仓库子模块指针。
- 来源：苏住房G/047.md；本例为 zhi2-web-admin 合入 develop/v2.6.2 与 develop/v2.6.2-suzhufang 的具体冲突处置。

<!-- MEMORY_FIELDS
{
  "category": "项目约定",
  "name": "suzhufang_merge_rule",
  "source_extraction_id": "648ee6c78c33403d80340cd311a1737b",
  "version": 2,
  "memory_type": "entities"
}
-->