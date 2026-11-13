# openviking_autostart
OpenViking 会话内不可用自动拉起 skill，2026-11-13 创建于 D:\repository\skills\openviking-autostart\，避免记忆写入/召回因服务掉线静默丢失。

## 基本信息
- 类型：DSH skill（SKILL.md + drill.ps1），frontmatter 含 name + description（"OpenViking 不可用/超时/连接拒绝时使用"）可被自动选中
- 创建于 2026-11-13，plan_review 73/100 通过并真实停服演练成功（耗时 20.9s）

## 触发条件
- MCP openviking 调用超时/连接拒绝，或直连 http://127.0.0.1:1933/health 失败
- openviking-context 缺失时仅做一次被动 /health 探测，失败才触发（避免误报）

## 启动逻辑
- 复用 C:\Users\Administrator\.openviking\start-server.bat（先保 Ollama，1933 未监听才单实例启动，日志 server.log）
- 服务端命令：C:\Program Files\Python310\Scripts\openviking-server.exe --config %USERPROFILE%\.openviking\ov.conf
- 启动方式：Start-Process cmd '/c start-server.bat' -WindowStyle Hidden，保留进程句柄
- 幂等：启动前 Get-NetTCPConnection -LocalPort 1933 已监听则跳过；Mutex 互斥防并发冲突

## 就绪与记录
- 分阶段等待：Listen 60s + health 60s（覆盖 Ollama 冷启动），判定 status == "ok"（不用 auth_mode 作健康指标）
- 恢复后写 event memory，字段 detected_at / recovered_at / duration_ms / trigger / version；写库失败降级本地日志
- 演练实测：kill 后端口 18s 恢复 Listen、health 21s 恢复 ok（远低于 120s 上限）

## 关系
- 与系统看门狗 OpenViking-Watchdog 互补：看门狗依赖 dsh web 在线且延迟数分钟，本 skill 为会话内即时检测拉起
- 属于 tyvt/skills 仓库（D:\repository\skills），文件未提交 Git

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "openviking_autostart",
  "source_extraction_id": "68619ab83cde4408957970de4fca9709",
  "version": 1,
  "memory_type": "entities"
}
-->