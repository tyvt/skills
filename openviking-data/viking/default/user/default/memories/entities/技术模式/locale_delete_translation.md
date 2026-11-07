# 删除按钮多语言翻译补全
修复个人中心基本信息删除按钮多语言显示问题（原显示 common.delete 键名），补全四语言包翻译。

## Description
- 原因：语言包未配置 common.delete 的翻译
- 在四个语言包的 common 中增加 delete 翻译：zh-Hans=删除、en=Delete、tc=刪除、jpn=削除
- 个人中心基本信息旁的删除按钮按当前语言显示对应文案

## 涉及文件
- src/locale/rent/zh-Hans.js
- src/locale/rent/en.js
- src/locale/rent/tc.js
- src/locale/rent/jpn.js

## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 来源会话ID：62bfabbe-4fa1-4f07-b690-2b4142ac21e3
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "locale_delete_translation",
  "source_extraction_id": "1d00a9284a824937a6f796a98da6d2f6",
  "version": 1,
  "memory_type": "entities"
}
-->