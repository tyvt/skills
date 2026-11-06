# Python3微软商店弹窗修复
苏州市房地产监测V3 环境修复后Agent调用python3不再弹出微软商店。

## 修复内容
- 关闭应用执行别名：删除 WindowsApps 下 python.exe / python3.exe 重定向 stub
- 创建硬链接 C:/Program Files/Python310/python3.exe 指向 python.exe
- 配置 Git Bash：~/.bashrc 添加 PATH 与 alias，自动生成 ~/.bash_profile 加载
- Cursor 设置添加 python.defaultInterpreterPath

## 验证结果
- Git Bash 解析 /c/Program Files/Python310/python3 版本 3.10.0 正常
- PowerShell 解析 C:/Program Files/Python310/python3.exe 版本 3.10.0 正常
- python3 -m pip 与 python3 -c 均正常

## 涉及与归属
- 涉及文件：.vscode/settings.json、Cursor User/settings.js
- 项目：苏州市房地产监测V3；来源会话ID：7907a58f-b73f-49f7-ad3d-d1a5d8cfa3eb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "python3_ms_store_fix",
  "source_extraction_id": "c002564f850c4da795d9ca098fc59f02",
  "version": 1,
  "memory_type": "entities"
}
-->