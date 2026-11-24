# ZenTao Bug 6476
禅道缺陷 6476：经纪机构变更对话框中「加盟品牌」原值为「无」时仍误显示变更标识、tooltip 显示「原值：(空)」；2026-11-11 首次修复，2026-11-23 重新激活，2026-11-24 在正确站点 8098 实机验证修复生效，待用户确认后提交并回写禅道。

## Description
- 模块：经纪机构（agency）变更流程的品牌字段变更对比（zhi2-web-admin 子模块）。
- 现象：当前值已显示「无」，但红色变更标记仍在，tooltip 显示「原值：(空)」；原图与激活图两张截图均确认该症状。
- 禅道记录：zt_action 91386（2026-11-11 解决，含根因备注）、98225（2026-11-23 重新激活，备注「仍然显示原值空」）；激活截图时间 2026-11-23 18:05。

## Root Cause
- 品牌字段变更对比把空 `brandId` 格式化为「空」，而当前值已归一为「无」，两者不相等 → 误标变更且原值显示「(空)」。
- `beforeForm.brandId` 运行时为空且无兜底；`v-tooltip` 疑似只绑定一次，异步 `beforeForm` 更新后 tooltip 仍保留「(空)」。
- 上次修复已加 `syncNoneBrand`（同时作用于 `form` 与 `beforeForm`）但无效；`dist/version.json` 构建时间 2026-11-23 13:42 早于 18:05 激活截图，说明上次修复已入构建仍复现。

## Fix
- `AgencyBasicInfoFormFields.vue:107` 品牌 tooltip 改用 `formatBrandForChangeCompare`；同文件 362-366 行新增格式化：`undefined/null/''/'none'` 统一映射「无」，其余走 `dictLabel`。
- 依据 `formChangeTooltip.js:78-79` 对 before/current 使用同一 formatter，评审确认该修复不是 no-op。
- 2026-11-24 已按评审通过方案在本地应用改动，eslint 与生产构建均通过，8098 站点所服务的 dist 中确实包含 `formatBrandForChangeCompare`。

## Resolution Status
- 2026-11-24（链 hop=1）：根因定位、计划审批、代码改动、eslint、生产构建均已通过；上一轮 agent-browser 触顶与 8103 站点错误已解决。
- 正确站点确认为 8098 端口（苏州市房地产综合服务平台，服务最新 dist，bundle index-2cBBVt99.js）；8103 实为「昆山物业公共服务平台」（uat）。
- 登录必须走「机构登录」页签，账号 911301292674345887（机构编码同号，即「贝海壳经纪公司」）；验证码为算术图，需用原生 setter + input 事件同步 Vue v-model 才能通过前端校验。
- 实机验证完成（2026-11-24）：机构变更页 `showChangeTooltip=true`、原值 brandId 为空、当前 brandId=`none`；`changeTooltip('brandId', formatBrandForChangeCompare)` 返回 false（无红三角、无「原值」提示），不传 formatter 时为「（空）」，证明该记录确实触发原 bug；页面视觉仅余必填红色星号。
- 证据截图 C:/Users/ADMINI~1/AppData/Local/Temp/zentao-6476/verify-zoom.png，对照原禅道截图 D:/禅道附件/bug/6476/file24006_image.png。
- 尚未提交、未推送、未回写禅道；下一步为等待用户确认 → 提交推送 → 回写禅道 → 清理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6476",
  "source_extraction_id": "93082bc8dd9a4f9e86cc8dea47253945",
  "version": 2,
  "memory_type": "entities"
}
-->