---
audit_status: valid
last_checked: 2026-11-26T22:44:09+08:00
verdict_note: syncNoneBrand/formatBrandForChangeCompare/formChangeTooltip 在苏州监测V3命中；DBX bug6476 标题与resolvedDate=2026-11-24吻合。
---
# ZenTao Bug 6476
禅道缺陷 6476：经纪机构变更「加盟品牌」原值为「无」时误显示变更标识、tooltip「原值：(空)」；2026-11-11 首次修复，2026-11-23 重新激活，2026-11-24 在 8098 站点实机验证修复生效，待用户确认后提交并回写禅道。

## Description
- 模块：经纪机构（agency）变更流程的品牌字段变更对比（zhi2-web-admin 子模块）；当前值已显示「无」但红色变更标记仍在、tooltip「原值：(空)」，原图与激活图两张截图均确认。
- 禅道记录：zt_action 91386（2026-11-11 解决，含根因备注）、98225（2026-11-23 重新激活，备注「仍然显示原值空」）；激活截图时间 2026-11-23 18:05。

## Root Cause
- 品牌字段变更对比把空 brandId 格式化为「空」，当前值已归一为「无」，两者不相等 → 误标变更、原值显示「(空)」；beforeForm.brandId 运行时为空且无兜底。
- v-tooltip 疑似只绑定一次，异步 beforeForm 更新后 tooltip 仍保留「(空)」。
- 首次（2026-11-11）修复已加 syncNoneBrand（在 companyBasicInfoShared.js，同时作用于 form 与 beforeForm）但无效；dist/version.json 构建时间 2026-11-23 13:42 早于 18:05 激活截图，说明该修复已入构建仍复现。

## Fix
- 2026-11-11 首次修复：新增 syncNoneBrand，在 change/detail.vue 的 getDetail 中对 form 与 beforeForm 应用；eslint 通过（0 error）、生产构建通过（exit 0），build hash 7e378bf39（develop/v3.0.0），仅存量 Sass 弃用警告。
- AgencyBasicInfoFormFields.vue:107 品牌 tooltip 改用 formatBrandForChangeCompare；同文件 362-366 行新增格式化：undefined/null/''/'none' 统一映射「无」，其余走 dictLabel。
- formChangeTooltip.js:78-79 对 before/current 使用同一 formatter，评审确认该修复不是 no-op；2026-11-24 已按评审通过方案本地应用，eslint 与生产构建均通过，8098 站点 dist 含 formatBrandForChangeCompare。

## Resolution Status
- 2026-11-11 首次回写（后因 11-23 重新激活而失效）：元数据 product=3、project=200、execution=201、openedBy=zhunan；DBX 事务（UPDATE zt_bug + INSERT zt_action，14 列）置 status=resolved、resolution=fixed、assignedTo=zhunan（退回开单人），事务已提交。
- 2026-11-24（链 hop=1）：根因定位、计划审批、代码改动、eslint、生产构建均通过；上一轮 agent-browser 触顶与 8103 站点错误已解决。
- 正确站点 8098（苏州市房地产综合服务平台，服务最新 dist，bundle index-2cBBVt99.js）；8103 实为「昆山物业公共服务平台」（uat）。
- 登录走「机构登录」页签，账号 911301292674345887（机构编码同号，即「贝海壳经纪公司」）；验证码为算术图，需原生 setter + input 事件同步 Vue v-model。
- 实机验证（2026-11-24）：机构变更页 showChangeTooltip=true、原值 brandId 为空、当前 brandId=none；changeTooltip('brandId', formatBrandForChangeCompare) 返回 false（无红三角、无「原值」提示），不传 formatter 时为「（空）」，证明该记录确实触发原 bug；页面视觉仅余必填红色星号。
- 证据截图 C:/Users/ADMINI~1/AppData/Local/Temp/zentao-6476/verify-zoom.png，对照原禅道截图 D:/禅道附件/bug/6476/file24006_image.png。
- 2026-11-11 用户选择「提交并推送」；子模块 develop/v3.0.0 落后 3 个提交，git pull --rebase 后到 1fdb73853；预存 public/version.json 修改（非本任务）按仓库规则不得提交。
- 截至 2026-11-24：尚未提交、未推送、未回写禅道；下一步等待用户确认 → 提交推送 → 回写禅道 → 清理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6476",
  "source_extraction_id": "076e30c49d0346ab8802adecc1580b91",
  "version": 3,
  "memory_type": "entities"
}
-->