# Git Worktree 隔离改代码工作流
本地 checkout 有进行中需求时，用 git worktree 隔离临时改动，主分支原样不动。

## 适用场景
- 本地 develop/v2.6.2-suzhufang-li checkout 有未提交改动（如 vite.config.js、env/.env），切分支会丢失或被迫 stash
- 用户正在另一需求上工作，主 checkout 状态必须逐字节保持

## 操作步骤
- 新建临时 worktree：git worktree add D:\repository\zhi2-wt<任务号> <目标分支>（示例 zhi2-wt2162）
- 在 worktree 内完成修改、提交、rebase、推送
- 用完即删：git worktree remove <路径>
- 交付时核验主 checkout 与未提交改动原样未动

## 注意事项
- 父仓 gitlink 指向旧提交属预期差异（父仓在别的分支且有进行中需求），勿替用户动，等合并或回主线再统一升级
- 提交后仍校验（示例 ea95e825d → rebase 后 f78fdd58a，基于他人 dbd161219 task 2104 无冲突）
- 来源会话 session-07a67f50；代码基线 6156653；所属项目 zhi2-web-admin


<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "git_worktree_isolation",
  "source_extraction_id": "b295e194d6564649b136acdc57649e00",
  "version": 1,
  "memory_type": "entities"
}
-->