# zhi3-web-admin-h5-g-unlimited
房地产综合服务平台门户父仓库，包含 zhi2-web-admin 子模块，分支 develop/v3.0.0。

## 仓库上下文
- 父仓库名：zhi3-web-admin-h5-g-unlimited（GitLab 项目），本地路径未明。
- 子模块：zhi2-web-admin，分支 develop/v3.0.0，提交 72561b36a 已推送（2026-11-11）。
- 2026-11-11 Bug6464 修复后，父仓 gitlink 更新至 6eddf6e 并推送，远端 SHA 一致。
- 2026-11-12 任务2428 完成后，zhi2-web-admin 提交 b61b9c547 已推送 develop/v3.0.0；父仓 gitlink 更新至 30f0ce0 并推送。
- 2026-11-13 删除三个注册页附件区重复 uploadTip 提示，zhi2-web-admin 提交 `26282982b` 推送 develop/v3.0.0；父仓 gitlink 更新至 `26ae481b` 并新增错误台账 E-052。
- 2026-11-13 禅道Bug6563 修复（经纪机构基本信息变更表单补充机构类型字段），zhi2-web-admin 提交 `dfeea07b9` 推送 develop/v3.0.0；父仓 gitlink 更新至 `7fe8569`，禅道 resolved/fixed/assignedTo=zhunan 待回归。

## 工作流事实
- 提交顺序：先推子模块，再提交父仓 gitlink 并推送（submodule-commit 固定顺序）。
- 保留未动他人 stash（#6358、6235），未进入并行 worktree。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi3_web_admin",
  "source_extraction_id": "f597db5064a0481e8b295afb68f6895f",
  "version": 4,
  "memory_type": "entities"
}
-->