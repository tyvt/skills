
# 全仓lint有历史债致Vue变更单独eslint
苏州市房地产监测V3 的 zhi2-web-admin 因仓库存在大量历史 lint 问题未跑全仓 lint，对涉及 Vue 文件单独执行 eslint。

## 背景与约束
- 仓库既有大量历史 lint 问题，故未跑全仓 lint
- 项目无 typecheck 脚本

## 单独审查结果
- 对 detail.vue、changeDetail.vue、index.vue、ExtractDialog.vue、BuildingForm.vue 单独 eslint 无新增错误
- BuildingForm.vue 实属 `buildingTable/` 而非 `buildinginfo/`
- 仅有 `vue/html-indent` 与 `prefer-zs-components` 既有告警
- 审查结论 Warning，合并前需确认业务与后端

## 涉及文件
- `buildingTable/components/BuildingForm.vue`、`buildinginfo/changeDetail.vue`、`buildinginfo/detail.vue`
- `buildinginfo/components/modifyForm.vue`、`buildinginfo/index.vue`、`buildinginfo/components/ExtractDialog.vue`
- `package.json`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/256.md
- 来源会话ID：eda148ea-5077-4e6e-a126-ed8b88e4742b
- 所属项目：苏州市房地产监测V3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_individual_eslint",
  "source_extraction_id": "aed79d0c8ddc4144a39077955e6f65cf",
  "version": 1,
  "memory_type": "entities"
}
-->