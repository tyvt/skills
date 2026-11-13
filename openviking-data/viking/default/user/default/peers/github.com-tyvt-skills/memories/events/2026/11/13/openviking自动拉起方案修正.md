# Summary
用户于 2026-11-13 对助手提出的 openviking-autostart skill 方案提出 7 项修正意见：先确认未知启动命令、明确后台启动语义、收紧 context 缺失误报、加端口监听幂等防并发、改 event memory 字段与措辞、区分 auth_mode 与健康、补 skill description 可发现性；结论要求先确认启动命令与幂等逻辑再落文件。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 需要修正的问题
1. 逻辑硬伤：启动命令未知，却先定方案
你在最后才承认"不知道启动命令"，但方案第 3 步已经写死"运行 OpenViking 启动命令"。这是整个方案唯一的关键路径依赖，应该在写 SKILL.md 前先确认，否则 skill 写出来是个空壳。建议顺序：先查清启动方式（Get-Command ov、查 0.5.3 的安装目录、看是否有 start.ps1/服务注册），再定稿。

2. "后台、不阻塞"与"轮询就绪"的语义要写清
PowerShell 里后台启动有几种写法（Start-Process、Start-Job、& ... & 不适用）。SKILL.md 里必须明确：

用 Start-Process -WindowStyle Hidden 还是 Start-Job；

进程句柄是否需要保留（用于失败时清理）；

如果启动命令本身是阻塞型（前台 server），后台化方式不同。

否则执行者（或未来的 agent）会各写各的。

3. 触发条件里的"会话开头 context 缺失"有误报风险
openviking-context 缺失可能是首次会话、记忆为空、该轮不需要记忆，不等于服务挂了。建议改成：context 缺失时只做一次 /health 被动探测，失败才触发启动——你方案第 1 条第 3 点其实已经这么写了，但表述上容易让人直接拉起服务。措辞收紧即可。

4. 并发/幂等问题
如果两个会话同时发现服务挂了，会同时启动，导致端口冲突（你自己在风险里也提到了）。建议在启动前加一个轻量锁：例如检查 1933 是否已被监听（Test-NetConnection 或 Get-NetTCPConnection -LocalPort 1933），已监听则跳过启动直接进入轮询。这比"失败不重试"更主动。

5. 记录 event memory 的时机与内容
掉线时间：你无法知道确切掉线时刻，只能记录"发现不可用时刻"。措辞要改。

建议字段：detected_at、recovered_at、duration_ms、trigger（哪类触发）、version。这样后续排查能区分"MCP 超时"和"直连失败"。

6. 版本号与健康语义
/health 返回 auth_mode: dev，说明是开发模式。SKILL.md 里"报告 version=x"没问题，但不要把 auth_mode 当健康指标；同时注意 healthy:true 与 status:ok 双字段，判定条件建议用 status == "ok"（你已这么写，保持）。

7. 落地位置与可发现性
放 D:\repository\skills\openviking-autostart\SKILL.md 合理。但要在 SKILL.md 顶部写清 trigger 描述（agent 靠 description 决定是否加载），否则 skill 不会被自动选中。建议 description 明确写"OpenViking 服务不可用/超时/连接拒绝时使用"。

结论
方案骨架可接受，但不建议现在写 SKILL.md——先补两件事：

确认启动命令（关键路径，未知则方案不成立）；

补"启动前检查端口是否已监听"的幂等逻辑（解决并发冲突）。

这两点确定后，其余是措辞和字段细化，可以直接送 plan_review 并落文件。当前状态送 review 大概率会被打回"启动命令未定义"。

<!-- MEMORY_FIELDS
{
  "event_name": "openviking自动拉起方案修正",
  "goal": "修正方案7项硬伤",
  "summary": "用户于 2026-11-13 对助手提出的 openviking-autostart skill 方案提出 7 项修正意见：先确认未知启动命令、明确后台启动语义、收紧 context 缺失误报、加端口监听幂等防并发、改 event memory 字段与措辞、区分 auth_mode 与健康、补 skill description 可发现性；结论要求先确认启动命令与幂等逻辑再落文件。",
  "ranges": "10-20",
  "source_extraction_id": "68619ab83cde4408957970de4fca9709",
  "version": 1,
  "memory_type": "events"
}
-->