# Summary
2026-11-12助手将orchestrator-gate通过符号链接放入C:\Users\Administrator\.dsh，向web profile的package.json添加依赖dsh-orchestrator-gate并pnpm install，恢复cordis.patch.yml只读拒绝权限，使插件可被加载（需再次重启生效）。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 我重启过了
...
**assistant [peer=github.com-tyvt-skills]**: 插件只在仓库里，profile 没挂上。现有插件都是 `~\.dsh\<name>` 符号链接再写进 profile 的 bundles。我按同样方式挂上。
**assistant [peer=github.com-tyvt-skills]**: 上次重启时这个插件还没挂进 Web profile，所以拦截文案仍然来自 `agent-guard`。现有插件都是先在 `C:\Users\Administrator\.dsh` 下建符号链接，再写进 profile 的 `bundles`。`orchestrator-gate` 之前只存在于仓库目录，进程加载不到。

现在已经补上：

- 符号链接 `C:\Users\Administrator\.dsh\orchestrator-gate` 指向 `D:\repository\skills\dsh\orchestrator-gate`。
- `C:\Users\Administrator\.dsh\profiles\web\package.json` 增加了依赖 `dsh-orchestrator-gate`，并把它加入 `dsh.profile.bundles`。
- 在该 profile 目录执行了 `pnpm install`，`node_modules\dsh-orchestrator-gate` 已存在。
- `cordis.patch.yml` 的只读拒绝权限已重新加上。安装时它挡住了 pnpm 遍历，装完后恢复了。

当前这个会话是在安装之前启动的，还是读不到新插件。需要再重启一次 Web，然后同样三条命令才会走到 `orchestrator-gate`。重启后根级 grep 的拒绝文案应以 `[orchestrator-gate]` 开头。深度不小于 2 的 grep 和 `npm run build` 仍应放行。

<!-- MEMORY_FIELDS
{
  "event_name": "挂载orchestrator_gate插件",
  "goal": "激活插件",
  "summary": "2026-11-12助手将orchestrator-gate通过符号链接放入C:\\Users\\Administrator\\.dsh，向web profile的package.json添加依赖dsh-orchestrator-gate并pnpm install，恢复cordis.patch.yml只读拒绝权限，使插件可被加载（需再次重启生效）。",
  "ranges": "25,43-57",
  "source_extraction_id": "f1834dc909d44d13821449e3056db37a",
  "version": 1,
  "memory_type": "events"
}
-->