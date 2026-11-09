# Summary
2026-11-09 完成 zhi2-mobile-query-h5-c-unlimited 测试环境 mock 关闭：.env.test 的 VITE_DATA_MODE 由 demo 改 remote、VITE_FLOOD_MOCK 与 VITE_EVALUATION_MOCK 由 true 改显式 false、VITE_API_BASE_URL 由空改 /api，保留 VITE_UI_REF8443=true；vitest.config.ts 固定单测 VITE_DATA_MODE 为 demo 以解除对 .env.test 的隐式依赖。提交 fd05a55 并推送 origin/dev(8a2983c..fd05a55)，npm test 21/21 通过，nginx 8095 验证产物 VITE_FLOOD_MOCK:false、VITE_DATA_MODE:remote 且无 demo 种子。
# 2026-11-09 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 关闭测试环境打包的mock数据
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 已完成「关闭测试环境打包的 mock 数据」。

## 改动（2 个文件）

| 文件 | 改动 |
| --- | --- |
| [.env.test](<.env.test>) | `VITE_DATA_MODE` `demo` → `remote`；`VITE_FLOOD_MOCK` / `VITE_EVALUATION_MOCK` `true` → 显式 `false`；`VITE_API_BASE_URL` 空 → `/api`。保留 `VITE_UI_REF8443=true`（这是与 8443 参考站的 UI 像素对齐开关，不属于 mock） |
| [vitest.config.ts](<tools/testing/vitest.config.ts>) | 单测 env 固定 `VITE_DATA_MODE: 'demo'`，解除单测对 `.env.test` 的隐式依赖——否则 `npm run test` 里 1 个用例会因 remote 模式调用 `uni.request` 报 `ReferenceError: uni is not defined`，导致打包中断 |

**为什么用显式 `false` 而不是直接删掉开关**：删掉时 `import.meta.env.VITE_FLOOD_MOCK` 不是编译期常量，esbuild 无法消除分支，演示工单数据仍会被打进 `dist`。改成显式 `false` 后，产物里的 demo 种子内容（`南门辅路少量积水`、`2026-10-28`、`flood-mock-token-v1` 等）已全部为 0。

## 验证

- `npm run test`：21/21 单测通过，`DONE Build complete`，退出码 0。
- 产物内烘焙的 env：`VITE_DATA_MODE:"remote"`、`VITE_API_BASE_URL:"/api"`、`VITE_FLOOD_MOCK:"false"`、`VITE_EVALUATION_MOCK:"false"`。
- nginx UI 站点「防汛C端」（8095，root 已指向本项目 `dist`）返回 200，线上资源同样确认上述值且不含演示数据；站点配置无需改动。
- nginx `-t` 通过。

## 流程与状态

在独立 worktree `苏住房防汛C端-wt-testmockoff`（分支 `fix/test-mock-off`）完成修改与构建验证；验证通过后把同一 diff 落回主工作区 `dev`，worktree 与临时分支已删除，主工作区 `node_modules` 完好。目前主工作区仅有上述 2 个**未提交**改动，未推送。

两点说明：关闭 mock 后，test 包的登录/列表/详情数据均来自真实接口，而当前 nginx `/api/` 仍反代 **dev 网关**（`...dev.zhi.com`），若要切到 test 网关需另行调整；[.env.example](<.env.example>) 未改动，仍保留演示开关的注释说明，方便需要时重新开启。

现在需要你确认这两处改动的提交方式：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 收到，执行「提交并推送」。先按提交规程做前置检查（仓库层级、子模块、暂存区、远程与未推送提交）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 本地 `dev` 与 `origin/dev` 完全同步（0/0），无子模块、暂存区干净、无历史未推送提交。现在按具体路径暂存并复核暂存内容。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 暂存内容核对无误（仅这 2 个文件、无夹带）。现在提交。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 提交完成 `fd05a55`。现在推送到 `origin/dev` 并核验远程。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 推送成功：`8a2983c..fd05a55  dev -> dev`，本地与 `origin/dev` 已同步（0/0），工作区干净。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 提交推送已完成。

## 结果

| 项 | 结果 |
| --- | --- |
| 仓库 | `D:\repository\苏住房防汛C端`（最外层主仓库，无 `.gitmodules`、无子模块） |
| 分支 | `dev` → `origin/dev` |
| 提交 | `fd05a55` `chore(build): 关闭 test 环境打包的 mock 数据，改走真实接口` |
| 推送 | 成功 `8a2983c..fd05a55  dev -> dev` |
| 远程核验 | 重新 fetch 后本地/远程 `0 0`，`origin/dev` HEAD 为 `fd05a55`，`git branch -r --contains fd05a55` = `origin/dev` |
| 工作区 | 干净，无未提交改动；`dist/` 受 `.gitignore` 忽略，属构建产物不入库 |

入库文件仅 [.env.test](<.env.test>) 与 [vitest.config.ts](<tools/testing/vitest.config.ts>)，暂存差异已逐行复核，无夹带无关改动、临时文件或凭据。

## 收尾状态

- 独立 worktree `苏住房防汛C端-wt-testmockoff` 与临时分支 `fix/test-mock-off` 已删除，`git worktree list` 只剩主工作区，主工作区 `node_modules` 完好。
- nginx UI 站点「防汛C端」（8095）已部署本次构建并验证：产物内 `VITE_FLOOD_MOCK:"false"`、`VITE_DATA_MODE:"remote"`、无 demo 种子数据。
- 无遗留后台任务。
- 已按验证结果记一条可复用根因到长期记忆（env 开关需显式 `false` 才能被 esbuild 消除 mock 分支；单测 env 需与打包 env 解耦）。

一点提醒：关闭 mock 后 test 包走真实接口，当前 nginx `/api/` 仍反代 **dev 网关**；若要指向 test 网关，属于另一处站点配置调整，告诉我即可。

<!-- MEMORY_FIELDS
{
  "event_name": "测试环境mock关闭完成",
  "goal": "记录mock关闭落地",
  "summary": "2026-11-09 完成 zhi2-mobile-query-h5-c-unlimited 测试环境 mock 关闭：.env.test 的 VITE_DATA_MODE 由 demo 改 remote、VITE_FLOOD_MOCK 与 VITE_EVALUATION_MOCK 由 true 改显式 false、VITE_API_BASE_URL 由空改 /api，保留 VITE_UI_REF8443=true；vitest.config.ts 固定单测 VITE_DATA_MODE 为 demo 以解除对 .env.test 的隐式依赖。提交 fd05a55 并推送 origin/dev(8a2983c..fd05a55)，npm test 21/21 通过，nginx 8095 验证产物 VITE_FLOOD_MOCK:false、VITE_DATA_MODE:remote 且无 demo 种子。",
  "ranges": "0,102-123",
  "source_extraction_id": "f85698defd2b4f5295e604b8f00a496d",
  "version": 1,
  "memory_type": "events"
}
-->