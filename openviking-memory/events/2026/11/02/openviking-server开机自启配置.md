# Summary
2026-11-02，course 要求在启动文件夹放置隐藏启动脚本快捷方式，使 openviking-server 开机自动启动；Ollama 已有启动项，openviking-server 原无自启。
# 2026-11-02 (Monday) ChatLog:
**assistant**: 插件没有显式 config（用默认）。默认 endpoint 应为 `http://127.0.0.1:1933`（之前 README 说 credentials 解析顺序最后 fallback 到 127.0.0.1:1933），而我们的 server 正好在 1933，且会话已经写进去了——证明默认即正确，无需改配置。

现在处理**持久性**：server 是我用 Start-Process 起的，DSH 重启后会断。需要确认：
1. Ollama 本身随系统自启（安装程序默认会）；
2. openviking-server 需要自启机制。

先确认 DSH 插件的 credentials 解析——它有没有 `~/.openviking/ovcli.conf`？没有的话插件怎么知道连 1933。

course检查 ovcli.conf 和认证配置，确认插件连得上且长期稳定。
**assistant**: `ov` CLI 需要先设语言（不重要，REST 已验证通）。关键点：没有 `ovcli.conf`，但插件仍成功写入 session——说明插件用默认 `127.0.0.1:1933` 直连，无需 client 配置。

现在唯一的问题：**server 是我手工 Start-Process 起的，DSH/机器重启后会失效**。需要开机自启。最稳的方式是给 openviking-server 建一个自启项。

先确认 Ollama 是否开机自启（安装默认注册），再给 openviking-server 建计划任务/启动项。
**assistant**: Ollama 有启动项（`Ollama.lnk` + `start-llama.bat`）。openviking-server **无自启**。

给 openviking-server 建一个启动快捷方式（放启动文件夹），让开机自动起。同时立即验证当前服务稳定。

course创建 openviking-server 开机自启（启动文件夹放一个隐藏启动脚本）。
**assistant**: 开机自启已配好，server 健康。

最后确认一件重要的事：**记忆抽取（commit）真的能工作**——现在 session 有 17169 pending tokens 但 commit_count=0。需要验证 VLM 真的能生成记忆。用一个直接测试：调用 commit API 或看插件是否会在阈值触发。先看该 session 是否已到自动提交条件，或手动触发一次 commit 验证 VLM 抽取链路。

course测试 VLM 记忆抽取链路：手动 commit 该 session 或直接测一个记忆写入。

<!-- MEMORY_FIELDS
{
  "event_name": "openviking-server开机自启配置",
  "goal": "配置开机自启",
  "summary": "2026-11-02，course 要求在启动文件夹放置隐藏启动脚本快捷方式，使 openviking-server 开机自动启动；Ollama 已有启动项，openviking-server 原无自启。",
  "ranges": "56-62",
  "source_extraction_id": "7e51d92889ed442aba7030e94557ef24",
  "version": 1,
  "memory_type": "events"
}
-->