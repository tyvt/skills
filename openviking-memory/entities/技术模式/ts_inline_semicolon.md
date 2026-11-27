---
audit_status: invalid
last_checked: 2026-11-27T03:50:33+08:00
verdict_note: 记忆所述「苏州市服务监管平台」在 D-/repository 不存在（exists=False），App.tsx 与 PARSE_ERROR 仅命中记忆归档；源仓不在工作区，无法证明有效。
---
# TypeScript 内联对象类型缺分号导致 Vite/oxc 解析失败
苏州市服务监管平台项目中，Vite/oxc 编译 src/App.tsx 时出现 PARSE_ERROR，根因是单行内联对象类型成员之间缺少分号。

## 问题根因
- oxc 解析器要求单行内联类型成员用分号分隔
- App.tsx 中内联对象类型缺分号导致编译失败

## 修复要点
- 五处补分号：约第 16、20、45、271、403 行

## 验证与归属
- 涉及文件：苏州市服务监管平台/src/App.tsx
- 所属项目：苏州市服务监管平台
- 验证证据：extracted source=cursor project=苏州市服务监管平台

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ts_inline_semicolon",
  "version": 1,
  "memory_type": "entities"
}
-->