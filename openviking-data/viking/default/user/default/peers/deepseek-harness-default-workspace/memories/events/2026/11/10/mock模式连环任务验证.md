# Summary
用户在 mock_execution: true 下发起连环任务（查看目录、建 test_agent 文件夹、切入、写 data.json 并打印路径）；助手跑完报告四步均过 security_guard，命令由 workbuddy/deepseek-v4.1-flash 生成，但 mock 回执重复带 Set-Location 导致 _apply_env_delta 对相对路径双计、cwd 出现双重目录，真实执行时不会双计。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 保持 mock_execution: true，跑一个连环任务：

“查看当前目录，然后创建一个 test_agent 文件夹，切换到里面，创建一个 data.json 写入 {"status": "ok"}，最后打印当前绝对路径。”
**assistant [peer=deepseek-harness-default-workspace]**: 保持 `mock_execution: true`，先把 `pwsh` 模型池和这条执行链路接到现有图上，再跑这个连环任务。
**assistant [peer=deepseek-harness-default-workspace]**: 这次是在 `mock_execution: true` 下跑完的，没有真正创建文件夹或写入文件。四步全部走了 `pwsh`，审查节点全部放行，命令由 `workbuddy/deepseek-v4.1-flash` 生成。

| 步 | 审查 | 生成的命令 | 写回后的 cwd |
|---|---|---|---|
| 查看当前目录 | 放行 | `Get-ChildItem` | `...\langgraph-orchestrator` |
| 创建 `test_agent` | 放行 | `New-Item -ItemType Directory -Path ".\test_agent" -Force` | 未变 |
| 切换进去 | 放行 | `Set-Location test_agent` | `...\test_agent\test_agent` |
| 写 `data.json` 并打印路径 | 放行 | 模型把写文件和打印路径用 `;` 合成了一行 | 仍是双重目录 |

汇总器把最后一步拆成了 `Set-Content ... '{"status": "ok"}'` 和 `(Get-Location).Path`。规划器本身只给了 4 步，第 4 步把「写文件」和「打印路径」并在了一起。

第 3 步的目录被套了两层。原因是 mock 回执里又带了一次 `Set-Location test_agent`，`_apply_env_delta` 对指令和回执各做了一次相对路径拼接。真实执行时如果回执只有 stdout、不再重复命令，就不会双计。

<!-- MEMORY_FIELDS
{
  "event_name": "mock模式连环任务验证",
  "goal": "验证mock执行链路",
  "summary": "用户在 mock_execution: true 下发起连环任务（查看目录、建 test_agent 文件夹、切入、写 data.json 并打印路径）；助手跑完报告四步均过 security_guard，命令由 workbuddy/deepseek-v4.1-flash 生成，但 mock 回执重复带 Set-Location 导致 _apply_env_delta 对相对路径双计、cwd 出现双重目录，真实执行时不会双计。",
  "ranges": "39-66",
  "source_extraction_id": "5fffb9d9c738449aa5cc01e1cd82a1aa",
  "version": 1,
  "memory_type": "events"
}
-->