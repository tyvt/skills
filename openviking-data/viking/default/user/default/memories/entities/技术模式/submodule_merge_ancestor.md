# 父仓合并子模块指针一方为祖先时保留后代
父仓库合并时若子模块指针双方均 modified 且一方提交是另一方祖先，保留后代（较新、含对方全部内容）一侧 SHA，属快进关系、零丢失。

## 适用场景
- 合并（pull/merge）冲突落在子模块 gitlink，两侧指针互有提交但呈祖先—后代关系
- 与「非祖先时按提交时间择一」(submodule_merge_newer) 互补：本模式适用于可判定祖先关系的情形

## 解决方案
- 在真实子模块 gitdir（.git/modules/zhi2-web-admin）用 `git merge-base --is-ancestor <theirs> <ours>` 验证祖先关系
- 若 theirs 是 ours 祖先，执行 `git checkout --ours zhi2-web-admin` + `git add` 将 gitlink 指向 ours，再 `git commit --no-edit`
- 注意：子模块工作目录无 .git 文件时 `git -C zhi2-web-admin` 会向上走到父仓库，须用 --git-dir 在真实 gitdir 核验避免误判

## 验证与归属
- 会话 2026-11-04 父仓 develop/v3.0.0 合并冲突：base=73942b3、ours=6e4e46a、theirs=31c0595
- 31c0595（含 companyAdmin/detail.vue「管理员维护编辑时不脱敏处理」）是 6e4e46a（多 bug6129/bug6132 等 6 提交）祖先，保留 ours，合并提交 ff6599a
- package-lock.json 单方改动自动合并（13507→12935 删 572 行）；远程 origin/develop/v3.0.0 已=ff6599a，推送为 no-op

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_merge_ancestor",
  "source_extraction_id": "55e647e1ecbf4c7eb850537bc716cc5d",
  "version": 1,
  "memory_type": "entities"
}
-->