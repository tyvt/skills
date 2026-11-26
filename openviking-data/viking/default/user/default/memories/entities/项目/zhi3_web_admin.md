---
audit_status: invalid
last_checked: 2026-11-26T22:39:59+08:00
verdict_note: 记忆涉及 zhi3-web-admin 父仓及9个提交SHA，本地无任何仓库含这些commit，父仓路径未明，无法实机证明。
---
# zhi3-web-admin-h5-g-unlimited
房地产综合服务平台门户父仓库，包含 zhi2-web-admin 子模块，分支 develop/v3.0.0。

## 仓库上下文
- 父仓库名：zhi3-web-admin-h5-g-unlimited（GitLab 项目），本地路径未明。
- 子模块：zhi2-web-admin，分支 develop/v3.0.0，提交 72561b36a 已推送（2026-11-11）。
- 2026-11-11 Bug6464 修复后，父仓 gitlink 更新至 6eddf6e 并推送，远端 SHA 一致。
- 2026-11-12 任务2428 完成后，zhi2-web-admin 提交 b61b9c547 已推送 develop/v3.0.0；父仓 gitlink 更新至 30f0ce0 并推送。
- 2026-11-13 删除三个注册页附件区重复 uploadTip 提示，zhi2-web-admin 提交 `26282982b` 推送 develop/v3.0.0；父仓 gitlink 更新至 `26ae481b` 并新增错误台账 E-052。

## 近期进展
- 2026-11-13 禅道Bug6563 修复（经纪机构基本信息变更表单补充机构类型字段），zhi2-web-admin 提交 `dfeea07b9` 推送 develop/v3.0.0；父仓 gitlink 更新至 `7fe8569`，禅道 resolved/fixed/assignedTo=zhunan 待回归。
- 2026-11-15 单文件 ESLint 检查 exit 0（剩余 259 条格式类 warning、无 error）；清掉三个未使用的组件注册，正在重建最终 dist，已通过的注册登录流程未受影响。
- 2026-11-15 UI 像素比对优化：先忽略图标差异，从品牌区、菜单位置和背景几何入手；本机站点保持在原基线；最新分数进展见任务 zhi2_home_revamp。
- 2026-11-15 分区域匹配分数：品牌标题 79.2%、菜单文字 81.0%、背景中带 88.8%、活动框 88.4%；本轮只试菜单字号与活动框高度、品牌区保持不变，用于确认这些可见差异能否提高匹配。
- 2026-11-15 子模块提交 `9ba4ccc0d` 后生产构建通过，`version.json` 的短哈希与该提交一致；按无强推方式检查主线 ahead/behind 后再将子模块提交推到项目主线。
- 2026-11-15 子模块主线已推送，远端 SHA 与本地提交 `9ba4ccc0dc...` 一致；干净的子模块主线检出已快进到该提交。下一步只在任务父仓提交 E2E 规格、参考图和新的 gitlink，主检出里其他脏文件不纳入。

## 工作流事实
- 提交顺序：先推子模块，再提交父仓 gitlink 并推送（submodule-commit 固定顺序）。
- 保留未动他人 stash（#6358、6235），未进入并行 worktree。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi3_web_admin",
  "source_extraction_id": "628eab1c162f4c7f9340168558b05bad",
  "version": 10,
  "memory_type": "entities"
}
-->