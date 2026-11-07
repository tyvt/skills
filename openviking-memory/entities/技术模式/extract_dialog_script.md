# 模板解析超时保护脚本
extract-dialog-content.js 在 @maintenance 目录处理中增加了循环超时与上限保护，避免死循环卡死。

## 功能描述
- 脚本用于从 zhi2-web-admin 模板中提取 zs-dialog 内容，遍历目录下文件。
- 原实现易在「提取属性」内层循环或带引号属性值循环处死循环，导致整体卡住。

## 超时与保护方案
- 外循环每次开头检查 `Date.now()`，超过 5 秒立即 `break` 退出解析。
- 「提取属性」内层循环加次数上限 `attrLoops < maxAttrLoops`（约 `min(模板长度*3, 100000)`）与时间检查 `Date.now() - startTime > PARSE_TEMPLATE_TIMEOUT_MS`。
- 三处「读到闭合引号」的 `while` 加 `quoted++ < template.length` 长度上限，防未闭合引号无限循环。
- 单文件解析超 5 秒放弃该文件，打印「模板解析超时」并继续下一个。

## 涉及信息
- 涉及文件：zhi2-web-admin/scripts/functions/extract-dialog-content.js
- 所属项目：2-0；来源会话：2566f7d9-ebd6-469e-91d9-d90e7554d3d0；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=2-0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "extract_dialog_script",
  "source_extraction_id": "eec1849560e54b0ab2f531caec03b1b3",
  "version": 1,
  "memory_type": "entities"
}
-->
