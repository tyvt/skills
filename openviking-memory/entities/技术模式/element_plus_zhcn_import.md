# Element Plus 2.x 中文语言包导入路径修正
Element Plus 2.x 中文语言包勿用无扩展名 deep import，应改用 dist 产物路径。
## 问题描述
- ESLint import/no-cycle 或运行报 ERR_PACKAGE_PATH_NOT_EXPORTED
- 子路径 `./es/locale/lang/zh-cn` 未在 exports 中定义，报错栈可能落在被引用页面
## 根因
- EP 2.x 实际语言文件为带扩展名的 dist 产物，无扩展名 deep import 被 Node 拒绝
## 解决方案
- 在 utils/element.js 将 `import zhCn from 'element-plus/es/locale/lang/zh-cn'` 改为 `import zhCn from 'element-plus/dist/locale/zh-cn.mjs'`
## 验证与归属
- 涉及文件：zhi2-web-admin/src/utils/element.js
- 所属项目：2-0；代码基线：none
- 验证证据：会话 e302a5bf lint zs-select-dialog-func.vue 触发，根因在 @/utils/element.js 语言包路径
- 来源会话ID：e302a5bf-385f-4cdb-bcf9-a77ad0d823ac

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "element_plus_zhcn_import",
  "source_extraction_id": "02b92ee3ef8445aa8281fd7042ea17fa",
  "version": 1,
  "memory_type": "entities"
}
-->