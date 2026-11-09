# 父仓子模块冲突直写已有合并提交
父仓库合并时若 zhi2-web-admin 子模块指针冲突，且子模块远程已存在合并提交（parents 正好为冲突两侧提交），则把父仓 gitlink 直接写成该合并提交 SHA，以保留双方工作。

## 适用场景
- 父仓 git pull/merge 冲突落在子模块 gitlink，本地与远程各指向不同子模块提交
- 子模块远程已存在合并提交，parents 正是本地与远程这两个冲突提交（子模块侧已先把双方工作合并）
- 与「一方为另一方祖先」(submodule_merge_ancestor)、「非祖先按时间择一」(submodule_merge_newer) 互补

## 解决方案
- 确认子模块远程合并提交 SHA（本批 d1acb5e147，parents = 本地移植 50ef0e0c4 + 远程 c2c645d8d，作者 ty 08:40）且已推到远程
- 父仓执行 git update-index --cacheinfo 160000,<合并提交完整SHA> zhi2-web-admin 落 gitlink，再用 git ls-files -u 确认冲突条目清空
- package-lock.json 若已暂存且为远程侧内容（与 MERGE_HEAD 一致，本批删 572 行）原样保留；生成父仓合并提交（本批 1c4a301，parents f5a2eab + 8470d07）后清除 MERGE_HEAD
- 子模块已含该合并提交 push 返回 Everything up-to-date；父仓推送新提交（本批 8470d07..7247576）；清理改动进新 worktree（align/mm-cleanup-final）提交后 FF 合并回父仓并删除

## 验证与归属
- 会话 2026-11-09 父仓 develop/v2.6.2-portal 合并冲突：本地 50ef0e0c4 vs 远程 c2c645d8d，子模块合并提交 d1acb5e147 已含双方，父仓 gitlink 直写 d1acb5e147，合并提交 1c4a301，推送 8470d07..7247576
- 本批新提交 1c4a301（合并解冲突）、7247576（清理失效引用）；此前本地 b1cf316、fe3d92a、91a7bdf、f5a2eab 一并推送
- 涉及文件 zhi2-web-admin；父仓门户（develop/v2.6.2-portal）；来源会话 2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_gitlink_merge",
  "source_extraction_id": "58da07990856413ca7ca5f372b5fc38c",
  "version": 1,
  "memory_type": "entities"
}
-->