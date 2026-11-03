# 「没效果」先定位测试环境构建的是哪条分支
修复只在功能分支、没合入测试分支等于没交付；用户实际运行的分支若也没构建，看到的仍是旧代码。

## 问题现象
- 用户反馈「没效果」，截图请求仍带 `parentDeptId=494439248`，页面 `build-time` 为 `85116e921`
- 回查 Git 确认修复代码根本没在测试环境运行
- 分支对照：`feat/task-2095-workorder-migration` 含修复（`d12d062de`）但未合测试分支；`develop/v2.6.2-suzhufang`（测试分支）原本只有 `a64d58b67`；`feat/task-2146-suggest-signature`（截图构建 `85116e921`）原本没有修复

## 根因
- 「把修复推到功能分支」被当成「完成交付」，但测试环境构建哪条分支决定修复是否生效
- 同一 bug 分散在功能分支/测试分支/用户实际分支三线时，只推一条 = 用户看到旧代码
- 隐蔽性：代码没问题、提交在、CI 绿，只是没被构建到

## 做法要点
- 「没效果」第一动作取版本指纹：页面 `build-time` 唯一定位环境跑的提交/分支（本次 `85116e921` → `feat/task-2146-suggest-signature`）
- 做三线对照：修复分支 / 测试构建分支 / 用户实际分支，缺哪条补哪条
- 用 worktree + cherry-pick 补：测试分支 `2d9918c7d`，再 cherry-pick 到用户实际分支 `85116e922..f62ea4265`
- 要用户触发重新构建才生效，验收判据为 `build-time` 不再是旧值
- 补完后做真实行为验证（dev server 8182 跑 e2e），不只跑单测

## 验证与归属
- 来源会话 session-d0dd96df-7bb2-4f65-86b1-3ecd10abac87（基线 c35a24a）用户诉求 6「没效果」
- e2e 验证 bug #5819 回归通过：「非本地」跳转列表请求均未携带 parentDeptId；「本地」跳转仍携带区域条件
- 涉及文件：homeStatNav.js、index-v2.vue、tests/e2e/bug-5819-nonlocal-no-region-param.spec.mjs

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "build_branch_check",
  "source_extraction_id": "e4f7a4332a82405ead33f2c2960fbe01",
  "version": 1,
  "memory_type": "entities"
}
-->