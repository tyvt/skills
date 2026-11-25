# 禅道 Bug 5239
苏住房G（zhi2-web-admin）业主自治-业委会选举表决详情页「行政区域」显示 `-` 的缺陷，2026-11-25 完成修复、实机验收、提交推送与禅道回写，状态 resolved/fixed。

## 问题现象
- 列表页同一记录「行政区域」回显吴中区，详情页显示 `-`，期望正常回显；bug 附两张截图。
- 实机复现：详情接口返回 `region='110101'`、`regionCode=null`，页面只读 `regionCode` 故显示 `-`（agent-browser 在 8167 环境复现）。
- 区划字典无 `110100` 市级条目，`provinceFormatter`（`src/formatters/index.js:164-173`）提前返回省级「北京市」，无法定位到区县。

## 修复
- 首轮改 `detail.vue:461-463`、`:645-650`，补 `regionCode←region` 映射与 `regionName` 回退；实机仅显示「北京市」，用户要求精确到区县，验收未通过。
- 最终仅改 `detail.vue` 两处：`:461` 展示值改为「区划字典精确匹配 → `regionName` → 原 `provinceFormatter`」；`:622` 新增 `regionNameByCode(code)`（两侧 `String()` 比较，空 code/非数组守卫）；不动接口映射、不改公共 formatters。
- 计划首轮因 JSON 解析问题被驳回，补齐建议后通过；改进计划 v2 经两轮审核通过（verdict=pass，0 个 P0），用户确认后实施。

## 验证与交付
- 目标文件 ESLint 通过；`npm test` 构建通过（exitCode=0，构建 hash `1683d89f2` 与 HEAD 一致）。
- 2026-11-25 agent-browser `eval` 得到「行政区域\n东城区」，截图自检通过（PNG、1256×581 等五项校验）后内嵌会话并经用户确认；用户选择「提交并推送」。
- 子模块 `1683d89f2` 推送 `develop/v2.6.2-suzhufang`（同批含仓库原有本地提交 `94e58351c`，非本次改动）；父仓 `2b477d0` 推送、gitlink 指向 `1683d89f2`，两端 `ls-remote` 核对一致；`env/.env` 已 stash 并恢复，未提交。
- 禅道 5239 置 `resolved/fixed`，回写 comment 内嵌验证图（fileID 24286），事务提交完成；临时日志与两张截图已清理（agent-browser CLI 无 `session close` 子命令，旧 session 保留但项目目录无过程产物）。

## 交接
- 2026-11-25 hop1 触发 P0 硬交接，交接文档 `D:/plan/苏住房G/HANDOFF-CHAIN-禅道bug5239-业委会选举表决详情页行政区域-hop1-20261125-0949.md`，chain_id=禅道bug5239-业委会选举表决详情页行政区域；hop2 完成剩余待办后链路终止（任务完成）。
- hop2 排程与交接文档第 5 节写有 `maxHops=10`，但工作区 AGENTS.md 较新规则要求交接链路不设最大跳数、任务未完成不得停止；hop=1 时两者结论一致（继续）。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_5239",
  "source_extraction_id": "1941e7fbcce24e2b80ead29f7681d611",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->