# 多语言显示异常先查语言包是否缺对应 key
页面多语言文字显示错误根因常是语言包漏配该 key，需在涉及的所有语言包补翻译而非改组件逻辑。

## 现象
- 按钮文案空白或原样显示 key（如 common.delete 在四个语言包都未配）
- 多语言显示异常而非组件逻辑错误

## 解决方案
- 先查语言包是否缺对应 key
- 在涉及的所有语言包对应节点补上翻译即可修复

## 验证与归属
- 验证：005.md 会话删除个人基本信息功能多语言显示错误，原因是语言包没配 common.delete
- 涉及文件：src/views/my/userInfo/index.vue
- 来源会话ID：005-i18n
- 代码基线：none
- 另一实例：会话 62bfabbe-4fa1-4f07-b690-2b4142ac21e3 中 rent 模块（src/locale/rent/ 下 zh-Hans.json、en.json、tc.json、jpn.json）common 节点缺 delete 翻译致删除按钮显键名，补翻译后正常；来源会话ID：62bfabbe-4fa1-4f07-b690-2b4142ac21e3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "i18n_key_missing_fix",
  "source_extraction_id": "f9ec5b11ea454e45917b012e0977c33f",
  "version": 2,
  "memory_type": "entities"
}
-->