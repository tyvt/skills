# 系统别名重定向python3致Agent弹微软商店
Windows 应用执行别名将 `python3` 重定向至微软商店 stub，致 Agent 调用异常，已通过硬链接与配置修复。

## 问题根因
- Windows 应用执行别名将 `python3` 重定向至 `WindowsApps` 下的微软商店 stub，致 Agent 调用异常

## 修复方案
- 删除 stub、创建 `C:\Program Files\Python310\python3.exe` 硬链接
- 配置 Git Bash `~/.bashrc` 与 Cursor `python.defaultInterpreterPath`

## 涉及文件
- zhi2-web-admin/.vscode/settings.json
- C:/Users/Administrator/AppData/Roaming/Cursor/User/settings.json

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/202.md
- 来源会话：7907a58f-b73f-49f7-ad3d-d1a5d8cfa3eb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "python3_alias_stub",
  "source_extraction_id": "8d3358f862fa431d858799b297104461",
  "version": 1,
  "memory_type": "entities"
}
-->