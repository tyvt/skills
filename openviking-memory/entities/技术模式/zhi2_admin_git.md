# zhi2-web-admin Git 子模块工作流
zhi2-web-admin 是父仓库子模块，独立 git 仓库，改动须走子模块内 worktree。

## 工作流
- 子模块内建独立 worktree 开发，提交后 fast-forward 合回 develop/v3.0.0 并推送；再于父仓库提交 gitlink 变更（M zhi2-web-admin）并推送父仓库；worktree 与临时分支用完即删
- 例外：用户指示"做在主线分支"时可直接在主线（如 develop/v2.6.2-suzhufang）开发推送不建 worktree（task2295 月报表暂存导出）

## 验证注意
- worktree 不含 node_modules，借主工作区 node_modules 做 SFC 编译校验；纯 Vue2 Options API 页面一致即编译安全
- 禁止用 PowerShell Get/Set-Content 读写含中文 Vue 文件（破坏 UTF-8+BOM），用 read/edit 工具
- worktree 自 HEAD 切出不含主工作区未提交改动；构建验证可放回主工作区（worktree 下 vite 更严格可能失败）
- 榆林子模块 worktree 的 vite rootDir 同为 D:/repository/榆林G，build 写同一 dist 互相覆盖，需用 --outDir 隔离；榆林变更落 develop/v2.6.2-yulin（仅子模块推进，父仓无对应分支）

## 远程推进与清理
- 远程 develop/v3.0.0 被并行推进不可 fast-forward 时禁止强推：先子模块合并 fix 分支入 develop/v3.0.0 推送，再父仓库合并远程 develop 解决 gitlink 冲突指向新子模块头；有同文件冲突则保留双方改动
- 子模块同文件并行冲突示例：#6337 的 beginDialogAsyncLoad 乱序防护与 #6235 的 paginateRows 分页切片在 chooseHouseDialog.vue 冲突，保留双方方法并改走 applyOriginPage（含 paginateRows 切片与 syncOriginSelection）
- 远程并行推进时合并（非 rebase）以保留父 gitlink 指向的提交哈希；远端 CI 修复 unused-files 的 vite.config.js 改动可一并合入子模块
- worktree 清理：含指向主仓 node_modules 的 junction 时先 cmd /c rmdir 摘除再删 worktree；worktree 含子模块时 git 拒绝直接删除，仅删自身目录后 prune
- 子模块 .git 链接缺失时 git -C $sub 静默回退父仓库；须恢复 .git 链接再推送；误删工作树恢复 .git 链接并 checkout 即无损失
- 2026-11-09 误删主工作区 zhi2-web-admin 的 .git 链接、工作树及 node_modules：用保留 gitdir 重建 .git 链接并 reset --hard HEAD 恢复跟踪文件，npm install 恢复 870 依赖包，git status 干净、构建通过、无丢失

## 父仓库本地配置
- 父仓库 env/.env 记录本地代理地址切换，属本地联调配置不纳入提交与推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_admin_git",
  "source_extraction_id": "46e8163f5c474aa9a7fe433290b8e7b3",
  "version": 13,
  "memory_type": "entities"
}
-->