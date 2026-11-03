# OpenViking 记忆 → skills 仓库快照

运行时记忆在 `%USERPROFILE%\.openviking\data\viking\default\user\default\memories\`；
本目录 `openviking-memory/` 仅为 **Git 备份快照**（复制同步，非符号链接）。

## 手动同步

```powershell
cd D:\repository\skills
node .\scripts\snapshot-openviking-memory.mjs
node .\scripts\snapshot-openviking-memory.mjs --commit --push --reason manual
```

## 全量导入结束后

`memory-migration/import-all.mjs` 在全部项目跑完后会自动执行：

```text
--commit --push --reason import-all-complete
```

（若导入是在添加此钩子之前启动的旧进程，需手动跑一次上述命令。）

## 定时快照（Windows 计划任务）

默认：**每天 03:00** 仅 `--commit`（本地提交，不推送）。

```powershell
# 注册（管理员 PowerShell 可选；当前用户任务一般不需要）
pwsh -File D:\repository\skills\scripts\register-openviking-memory-schedule.ps1

# 自定义：每周日 02:30，并推送
pwsh -File D:\repository\skills\scripts\register-openviking-memory-schedule.ps1 -Weekly -At "02:30" -Push

# 删除任务
pwsh -File D:\repository\skills\scripts\register-openviking-memory-schedule.ps1 -Unregister
```

## 校验

脚本会对每个 `.md` 检查：NUL 零填充（>5%）、末尾须以 `-->` 结束（MEMORY_FIELDS 尾块）。
失败则 exit 2，不会 git commit。

元数据：`openviking-memory/.snapshot-meta.json`（每次同步更新，可提交进 Git）。
