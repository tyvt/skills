# Windows python3 打开商店
在 Windows 中，WindowsApps 里的 python.exe/python3.exe 存根会将 python3 的调用重定向到 Microsoft Store。
## 问题
- WindowsApps 中的存根在调用 python3 时导致重定向到商店。
- 环境：Windows，Python 位于 C:\Program Files\Python310。
## 解决方案
- 删除存根并创建从 C:\Program Files\Python310\python3.exe 到 python.exe 的硬链接。
- 配置 ~/.bashrc 和 Cursor 中的 python.defaultInterpreterPath 以规避。
## 验证
- 来源: 苏州市房地产监测V3-leftover/005.md; session 7907a58f-b73f-49f7-ad3d-d1a5d8cfa3eb.
- 涉及文件: zhi2-web-admin/.vscode/settings.json; Cursor User settings.json.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：7907a58f-b73f-49f7-ad3d-d1a5d8cfa3eb


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "windows_python3_store_alias",
  "source_extraction_id": "96963c4591f34599a58a91018404b608",
  "version": 1,
  "memory_type": "entities"
}
-->
