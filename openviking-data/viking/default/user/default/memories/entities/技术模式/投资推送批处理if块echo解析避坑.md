# 投资推送批处理if块echo解析避坑
Windows 批处理在 if 括号块内解析 echo 时，特殊字符会被误判为块结构，导致脚本运行报错。
## 问题现象
- 块内 echo 含 `(UTC+08:00)` 会被当成 if 块括号，触发 `was unexpected at this time` 报错
- 块内 `%RUN_TIME%`（如 14:00）与 `%SCRIPT_DIR%`（盘符路径）中的 `:` 也会被误解析，导致部分提示行失败
## 修复方式
- 将时区检查、环境检查、成功/失败提示从 `if (...)` 改为 `goto` 标签分支
- 避免在括号块内输出含特殊字符的中文与路径
## 验证与归属
- 验证证据：会话 9a7d457f 用户报 setup_task.bat 报错，改 goto 后本地验证「定时任务创建成功」输出正常
- 涉及文件：setup_task.bat、run_push.bat
- 所属项目：投资推送；来源会话ID：9a7d457f-29fa-4589-a857-cfae82829cc6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "投资推送批处理if块echo解析避坑",
  "source_extraction_id": "60aec92e8bf545f9ac18a49ecfef75c7",
  "version": 1,
  "memory_type": "entities"
}
-->