---
session: session-96d34dee903e
status: approved
human_confirmed: true
approved_version: 1
approved_sha256: 3524281fdedfa535a25540f254df7c5c37d4eae29ef12c4d86aee24c8dac86ff
created: 2026-11-13
---

# 修复 cursor batch sealed 502 复发（插件升级到 0.2.44–0.2.46 后补丁未覆盖）

## 前因后果

11/2 已定位并修复过该错误（补丁提交 4742b76）：magpie cursor 插件 `NativeSession.acceptCall()` 封批守卫把「重传 exec 帧」误判为新调用，单调用步封批后 Cursor 重传即整轮 502。修复方式是把守卫拆两段：awaiting-results 时先按 requestID+digest 在已封批次里找匹配，命中则丢弃重传，找不到才 502。补丁挂在 `dsh-cursor-quiet-reapply` 计划任务（每 5 分钟）自动重打。

11/12–11/13 该错误复发 10 次。根因：**补丁脚本 `PLUGIN_DIR` 硬编码只盯 `~/.config/magpie/plugins/node_modules/...` 的 0.2.32 副本**，而 magpie 插件自动升级后，运行时实际从 `~/.cache/magpie/bun/install-cache/@magpie-community/opencode-cursor-auth@<版本>@@registry.npmmirror.com@@@1/` 的版本化目录加载插件；0.2.44/0.2.45/0.2.46 三个新副本均未打补丁，且 0.2.46 上游该缺陷代码原样存在。

## 现状与证据

- magpie app.log（`C:\Users\Administrator\AppData\Local\magpie\logs\app.log`）时间线：
  - 11/12 16:09 sealed 502 → 16:28 升级 0.2.44→0.2.45
  - 11/13 15:18 / 15:30 / 15:46 / 16:01 / 16:03 / 16:06 / 16:08 / 17:04 / 17:07 sealed 502 → 15:30 升级 0.2.45→0.2.46，16:30 host 重启后 17:04/17:07 仍报错 → **0.2.46 缺陷依旧活跃**
- 0.2.46 副本 `native-session.mjs` 1161 行守卫与 0.2.32 文本完全一致（`if (this.terminal || this.state === "awaiting-results") invalid(..., 502)`），注释同样承诺「重传先校验身份」但代码未实现。
- 已打补丁的 0.2.32 副本 755 行有 `[cursor-batch-sealed]` 标记；0.2.46 缓存副本无任何标记。
- 补丁脚本 `patch-batch-sealed.mjs`：`PLUGIN_DIR` 为 `.config` 固定路径；`GUARD` 锚点在 0.2.46 中同样唯一命中（结构未变）。
- `~/.dsh/patches` 是指向 `D:\repository\skills\dsh\patches` 的符号链接（改仓库即生效）；`reapply.mjs` 第 10/33 行 import 并调用 `applyBatchSealed()`；Windows 计划任务 `dsh-cursor-quiet-reapply` 每 5 分钟运行，Last Result 0。
- magpie-bun 进程 27504（16:30 启动）当前加载 0.2.46。

## 分布实施方案

1. **`dsh/patches/cursor-batch-sealed/patch-batch-sealed.mjs`**：把单目标 `PLUGIN_DIR/NATIVE/BACKUP` 改为多目标解析：
   - 目标 1：`.config` 固定副本（兼容保留）；
   - 目标 2..n：`install-cache/@magpie-community/opencode-cursor-auth@*@@registry.npmmirror.com@@@1/` 全部版本化目录（glob 展开，跳过不存在的）。
   - `status()/apply()/restore()` 遍历全部目标；备份按目录各存 `native-session.mjs.orig-batch-sealed`；`--check` 逐目标输出状态（patched/pristine/missing/unknown），全 patched 才 exit 0。
   - 锚点契约不变：目标文件布局变化即拒写（`unknown` 不动）；备份仅首次创建（已存在则跳过），保证 restore 永远回到 pristine。
2. **`batch-sealed.test.mjs`**：结构断言遍历全部目标文件；guard 行为测试不变。
3. **`README.md`**：补「插件升级 → 缓存目录换版本号 → 补丁自动重打到新目录」的复发场景说明。
4. **执行与验证**：`node patch-batch-sealed.mjs` 打上全部 pristine 目标（含 0.2.46）；`node --test batch-sealed.test.mjs` 全绿；`--check` 全 patched。
5. **生效**：重启 magpie-bun（结束进程 27504，magpie 自动重拉 plugin-host；若不自动拉则提示用户重启 magpie app）。观察 app.log 后续不再出现 sealed 502。

## 风险与回滚

- 锚点不匹配 → 脚本拒写（现有保护），不会破坏插件文件。
- install-cache 目录被 bun 清理重建 → reapply 每 5 分钟自动重打；版本目录消失时逐目标跳过，不影响其他目标。
- 回滚（按顺序）：① `schtasks /change /tn "dsh-cursor-quiet-reapply" /disable` 暂停自动重打；② `node patch-batch-sealed.mjs --restore` 恢复所有目标各自首次备份（pristine）；③ 验证后再 `/enable` 恢复任务。
- 若 install-cache 有完整性校验导致补丁被覆盖：补丁目录会失效（reapply 每 5 分钟自愈重打），届时验证加载路径实际来源再调整方案。

## 验证计划

- `node --test batch-sealed.test.mjs`：全部目标结构断言 + guard 行为 6 例全绿。
- `node patch-batch-sealed.mjs --check`：逐目标 patched，exit 0。
- magpie-bun 重启后：确认新进程存在，且其加载的 0.2.46 副本含 `[cursor-batch-sealed]` 标记；复用 cursor 通道跑对话，app.log 无新增 sealed 502。
