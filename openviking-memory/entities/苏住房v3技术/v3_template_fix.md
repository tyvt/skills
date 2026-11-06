# V3 Vue模板批量修复
苏州市房地产监测V3 项目通过脚本批量修复 Vue 模板问题，Blocking 问题从 ~152 降至 0，vite build 通过。

## 工具链
- `scripts/scan-vue-template.mjs` 全量扫描 template/script，过滤 `<img>` 误报（26 处忽略）
- `scripts/fix-vue-template.mjs` 幂等修复：栈解析修正 `el-row`/`template` 错配闭合；`slot="append"`/`#append` 多行修复；script 中 `const cols = [{...}]`、`push/map/forEach` 误写 `}]` 等
- npm scripts：`scan:vue-template` / `fix:vue-template` / `verify:vue-template`（含 build）

## 关键改进
- 早期正则修复重复执行产生振荡（问题数 61 → 153），最终改为栈解析为主、正则为辅，可重复执行且不互相破坏

## 涉及文件
- 手工处理边缘文件：`bankTable.vue`、`AgencyPersonnelDetail.vue`、`property/account/detail.vue`、`feeCustomTypeDialog.vue`、`ZsTencentMap/index.vue`、`commercialHousingSales/presale/contractView/index.vue`、`vite.config.js`、`src/mixins/ListTemplate.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：22208c57-3107-418d-bb7d-e6601b03c458；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_template_fix",
  "source_extraction_id": "b92f718b8a55409ca3d47ef5e5f4ce65",
  "version": 1,
  "memory_type": "entities"
}
-->