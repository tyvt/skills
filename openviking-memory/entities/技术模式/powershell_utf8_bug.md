# PowerShell 5.1 重写 UTF-8 文件致中文乱码
Windows PowerShell 5.1 默认按系统 ANSI 代码页（简体中文为 GBK）读写文件，不带 -Encoding UTF8 重写 UTF-8 源码/HTML 会把整份中文二次转码成乱码。

## 问题根因
- PS 5.1 的 Get-Content/Set-Content/Out-File 默认编码为系统 ANSI（GBK），按 GBK 解码 UTF-8 字节
- 写回时按 GBK 编码，多字节中文被二次转码为乱码，损坏是整份文件而非局部
- 在乱码基础上继续改会造成二次污染，无法逐字符修复

## 解决方案
- 禁止用 PowerShell 5.1 整文件重写 UTF-8 源码/HTML，改用 edit 工具做定点补丁
- 若必须用 PowerShell，显式 Get-Content -Encoding UTF8 加 Set-Content -Encoding UTF8（注意 PS5.1 的 UTF8 带 BOM，源无 BOM 时需去掉）
- 已改坏时恢复路径：用改动前完整副本还原，再只用 edit 打补丁，不尝试修乱码
- 改完必须做编码体检：无 BOM、UTF-8 正常解码、关键中文词计数正确、乱码特征串计数为 0
- 习惯：改中文文件前先 Get-Content -Encoding UTF8 确认内容读对再动手

## 验证与归属
- 验证：会话 12c5a5c9 用户用 PS5.1 重写 index.html 致中文乱码，已用改动前副本还原并仅用 edit 打补丁；校验无 BOM、UTF-8 正常、常量/买入/授权写入 计数正确、甯搁噺 乱码计数 0
- 顺带在 README.md 补「数据到底存在哪」一节说明三个存放位置与刷新行为
- 涉及文件：分析产出/持仓面板/index.html、分析产出/持仓面板/README.md
- 来源会话ID：session-12c5a5c9-6a1b-48dd-a554-1fba34f5640e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "powershell_utf8_bug",
  "source_extraction_id": "d64813143c314db1b4bf34a747505b1d",
  "version": 1,
  "memory_type": "entities"
}
-->