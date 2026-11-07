# 全局dictFormatter零值误判空白
园区公共收益项目(zhi2-web-admin)中，main.js 的全局 dictFormatter 用 `if (!cellValue) return ""` 会把合法字典值 0（如 status、布尔型）显示成空白。

## 问题根因
- 字典翻译实现为 `if (!cellValue) return ""`，status=0、布尔型字典等合法取值 0 被当成空值，整列不显示「成功/是」等文案，1 仍正常
- 根因在 main.js dictFormatter 的 falsy 判断

## 修复做法
- 空值判断只排除 null、undefined、空字符串，让 0 继续走 options 匹配
- 单页若硬编码文案需与列表筛选口径一致（如操作日志成功用「成功」而非「正常」）

## 涉及文件
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/views/system/operlog/index.vue
- 所属项目：园区公共收益；来源会话：a2c3210a-38a4-4169-bda2-87a7f0f5a713；代码基线：635e747

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dictformatter_zero_blank",
  "source_extraction_id": "20c68d54ca9a417f9c53b7e4b8c7bb11",
  "version": 1,
  "memory_type": "entities"
}
-->
