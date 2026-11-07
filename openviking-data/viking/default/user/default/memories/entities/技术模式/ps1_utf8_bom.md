# PowerShell 脚本必须 UTF-8 BOM 保存
PowerShell 5.x 读取无 BOM 的 UTF-8 脚本会按系统 ANSI 代码页（GBK）解析，导致中文路径乱码、脚本解析失败。

## 根因
- 脚本文件存成不带 BOM 的 UTF-8，PowerShell 无可靠编码探测，退回系统默认代码页
- 同一逻辑在 bash/Node 正常，仅 .ps1 起不来，报错常指向路径不存在而非编码

## 修复做法
- 所有 .ps1 脚本一律存为 UTF-8 with BOM（写入显式指定编码含 BOM）
- 脚本含中文路径时更需注意（如硬编码 JDK 路径改为 Scoop 路径 D:\sdkpps	emurin8-jdk\currentin\java.exe）
- 编辑后立刻实际执行一次验证，不只看内容
- 跨团队约定写进脚本模板/工具链，避免各按编辑器默认保存
- 与控制台输出编码坑区分：这是脚本文件编码，不是输出编码

## 验证与归属
- 来源会话 session-80e78cbf-5439-4db6-bf65-920d4fe3ee80（基线 b6ffc68）
- 涉及文件 D:/sdk/start-backend.ps1、D:/sdk/版本管理-CHEATSHEET.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ps1_utf8_bom",
  "source_extraction_id": "1263221b66574e68adffd33a9aa6f611",
  "version": 1,
  "memory_type": "entities"
}
-->