# ElButton type="text" 弃用兼容
Element Plus 3.0 将废弃 ElButton 的 type="text"，项目统一改为 link 按钮样式。

## 问题根因
- 控制台出现 ElementPlusError: [props] type.text deprecated 弃用提示
- ElButton 的 type="text" 在 3.0 将废弃，官方推荐改用 link 按钮样式

## 解决方案
- 将项目里直接写的 `<el-button type="text">` 改为 `<el-button link>`（共 4 处）
- 在公共组件 zs-button 做兼容：当 rest.type === 'text' 时删除 type 并设置 rest.link = true
- 修改文件：zhi2-web-admin/src/components/zs-button/zs-button.vue

## 验证与归属
- 验证方式：重新启动或刷新页面后该告警应不再出现
- 所属项目：2-0；来源会话ID：00b18628-52c8-4770-87e2-b9abc61e87b6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elbutton_link_fix",
  "source_extraction_id": "bfd013e391d9471ea436a5f588e52aad",
  "version": 1,
  "memory_type": "entities"
}
-->