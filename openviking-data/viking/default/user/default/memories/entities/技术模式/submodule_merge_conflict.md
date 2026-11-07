# 子模块指针合并冲突按祖先关系裁决
父仓库与远端合并时冲突落在子模块指针上，应先查祖先关系再决定保留哪边，不重做子仓 merge。

## 问题现象
- 父仓库（superproject）与远端合并时冲突落在 zhi2-web-admin 子模块指针上（gitlink 160000，stage2/stage3 各指向不同 commit）
- 两边开发各自推进了子模块并更新指针，父仓合并无法自动裁决

## 根因
- 两边开发各自推进子模块并更新指针，父仓合并时无法自动选择

## 解决方案
- 不要盲目重置或重合并；先进入子仓库核对两个 commit 的祖先关系（git merge-base / git log 判断）
- 若我方指针已是对方指针的祖先提交（我方已包含对方改动），直接保留我方指针，在父仓 git add <submodule> 标记冲突解决即可，无需在子模块里再做 merge；反之亦然
- 判断依据是包含关系而非时间，能避免选到不含对方改动的假新提交
- 完成后工作区校验与 push 由用户确认网络/权限后自行执行

## 验证与归属
- 验证证据：会话 329b50fe，冲突为子模块 gitlink；结论核对 b827de55 是 aeb35975 的祖先提交后保留 aeb35975，git add 子模块即解决
- 涉及文件：.gitmodules
- 所属项目：产品2.0；来源会话ID：329b50fe-128b-4e82-b350-dc2a3e01a7f8；代码基线：6b9d9d7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_merge_conflict",
  "source_extraction_id": "c8b52637b66a4cfba2ab5391cdb691f9",
  "version": 1,
  "memory_type": "entities"
}
-->