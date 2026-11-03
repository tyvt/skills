# 树层级切换同列文字开关错乱
苏住房G行政区域银行授权页左侧树在市/区/街道间切换时，「启用状态」列有时显示字典文字、有时显示开关，静止正常，快速切换更乱。

## 问题根因
- 表格列 :key 仅用 column.prop || column.label，市级 enableStatus 列 type=dict、区级 type=switch，prop 相同致 Vue 复用同列组件实例，内部渲染器不重建残留上一种形态
- 快速切换时多个 getList 并发，后发先回用旧层级响应覆盖新层级数据，放大错乱

## 解决方案
- 表格加层级 key：:key="tableViewKey"，值取 city/district/street 强制重建
- 列 key 带层级与类型：`${tableViewKey}-${column.prop}-${column.type}`
- 加请求序号保护 listRequestId，响应回来序号不匹配则丢弃

## 验证与归属
- 验证：064.md 会话 ecdea30a 用户纠正「不是设计问题，而是反复点击市级区级街道会错乱」
- 涉及文件：system/regionBankAuth/index.vue、system/regionBankAuth/utils.js、mixins/listMixins.js
- 所属项目：苏住房G；来源会话ID：ecdea30a-99b2-441c-917e-7cbad52000ed；代码基线：864b409
- 排查提示：用户说「有时候A有时候B」且与操作速度相关，优先怀疑同prop不同type列复用+异步竞态

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_col_reuse",
  "source_extraction_id": "b3536856883b46aa95bcd23a6b8147f5",
  "version": 1,
  "memory_type": "entities"
}
-->