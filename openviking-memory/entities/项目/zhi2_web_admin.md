---
audit_status: valid
last_checked: 2026-11-28T01:45:11+08:00
verdict_note: 项目知识记忆：version.json/returnRawResponse/LEASE_CHANGE_FLOW_BUS_CODE/common-errors.md 等命中，子模块提交流程与仓库结构属实。
---
# zhi2-web-admin
房地产综合服务平台门户，主仓 `苏州市房地产监测V3`（`D:\repository\苏州市房地产监测V3\`）的 git 子模块，路径 `D:\repository\门户\zhi2-web-admin`。

## 仓库与流程
- 提交顺序固定：先推子模块，再提交父仓 gitlink 并推送；子模块 `version.json` 构建后须回退保干净；主仓未跟踪产物与被改 `env/.env` 不动（2026-11-09 父仓 gitlink `77a7e6dee` 与 HEAD 一致）。
- 错误台账 `docs/frontend/common-errors.md` 只改 worktree 副本、禁改主仓库：2026-11-09 加 E-046、2026-11-13 加 E-052。
- `suzhufang-li` checkout 于 `bug5897` worktree（主检出 detached HEAD），提交后同步主检出并刷父仓 gitlink（2026-11-10）；子模块目录空或 `.git` 缺失可 `git submodule update` 恢复（2026-11-09）；`.git` 指针含中文路径误报 "modified content" 实为正确 UTF-8。
- 2026-11-14 基线核对：父仓保留 3 项原有改动、子模块干净；候选 worktree 基线、test 与生产构建通过，产物标记/分支哈希 `b48629cd4`，产物在其 `dist`；待产物扫描、站点 root 核验与截图交互检查。

## 提交与改动
- 2026-11-13 删三个注册页附件区重复 uploadTip：子模块 `26282982b` 推 develop/v3.0.0，父仓 gitlink `26ae481b`（新增 E-052）。
- 关键数据导航内容纵向撑满卡片底部：提交 `50d3a8961`（style(home-v2)），仅改 KeyDataNav.vue、SectionCard.vue，lint 通过已推分支。
- `src/views/benefit/pubAllotNotice/detail.vue` 既有改动未暂存未提交，有意保留。
- 任务 2468（顶部导航）需求、验收标准与进展见卡片「任务2468顶部导航平铺」。

## 问题与缺陷
- companyRecord.js 缺 `LEASE_CHANGE_FLOW_BUS_CODE` 导出致 `AgencyBasicInfoDetail.vue` 编译中断；`0049c14e3` 定为 `'zljgbgxq'`（租赁机构），待补导出（2026-11-11）。
- `utils/request.js:215` 的 `returnRawResponse` 支持透传原始响应。
- develop/v2.6.2-suzhufang 已合入 bug6369、bug6540、bug6568、bug6577、bug6576、bug5819、bug6582（根因/提交/禅道状态见同名卡片）；develop/v3.0.0 已修复 bug6563（经纪机构基本信息变更表单补机构类型字段，见 bug6563 卡片）。
- bug6559：惠山 `6fc3bb94d`、苏住房 `4a32dc38f` 均仅改 detail.vue（pubAllotNotice 漏 noticeAmount、金额无兜底）；禅道 resolved/fixed（zt_action 92984），目视验证未完成，后端 Dameng 表缺合同列待补，详见 zentao_bug_6559。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "5f080cbb99a24b8daf71e98dcc0b4aee",
  "version": 43,
  "memory_type": "entities"
}
-->