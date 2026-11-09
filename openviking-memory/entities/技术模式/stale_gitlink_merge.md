# 父仓子模块滞后指针的合并策略
当父仓库子模块 gitlink 因未 fetch 而滞后、真实远程子模块 develop 已含所需提交时，须先 fetch 真实远程，再在其上叠加特性分支并更新父仓 gitlink。

## 适用场景
- 父仓子模块 gitlink 停留在旧提交，本地工作区未 fetch 导致指针滞后
- 真实远程子模块 develop 已包含本应合入的提交（如 #6365 已推到远程 origin/develop/v3.0.0）
- 与「一方为祖先保留后代」(submodule_merge_ancestor)、「rebase gitlink 直写」(submodule_rebase_gitlink) 互补

## 解决方案
- 先 fetch 子模块真实远程 develop，确认其 SHA（本批 origin/develop/v3.0.0 = 3971283573，已含 #6365）
- 在子模块已停在真实 develop 的工作树（如 wt-bug-6326）中，把特性分支（如 #6326）合并进子模块 develop
- 子模块合并后取得新 SHA，再更新父仓库 gitlink 指向该 SHA，使 #6365 一并带回父仓引用
- 切勿基于滞后本地旧 gitlink（如 05a1a44）直接合回，否则会丢失远程已含的提交

## 验证与归属
- 会话 2026-11-09 澄清：wt-bug-6326 子模块 origin/develop/v3.0.0 已为 3971283573（含 #6365），父仓 gitlink 滞后于旧 05a1a44
- 结论：把 #6326 合回主分支须基于真实远程 develop（3971283573）叠加 #6326，再更新父仓 gitlink
- 涉及子模块 zhi2-web-admin；来源会话 2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stale_gitlink_merge",
  "source_extraction_id": "c1ec6990586346319c3f77f70f3fc31a",
  "version": 1,
  "memory_type": "entities"
}
-->