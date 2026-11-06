# 业务状态选择器默认多选改单选修复
产品2.0 项目 zs-search-form.vue 中，针对 type === 'select' 且 model === 'bizState' 的表单项，修复了未传 multiple 时默认多选的问题。

## 问题根因
- 当 attrs 里未显式写 multiple 时，原逻辑默认 true（多选），导致未配置页面均为多选

## 修复内容
- 改为 Object.prototype.hasOwnProperty.call(attrs, 'multiple') ? attrs.multiple : false，默认单选
- 需要多选的页面在 formItems 里显式写 attrs: { ..., multiple: true }

## 兼容性提示
- 之前依赖多选（值为数组）的列表查询，未配 multiple: true 的页面会变成标量
- 若接口仍要数组，需显式加 multiple: true 或在请求参数里把单值转成数组

## 涉及文件与验证
- d:/repository/产品2.0/zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue
- 所属项目：产品2.0；来源会话：0bc574c1-233a-406d-9cc5-678ea3dabed5；验证证据：extracted source=cursor project=产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_multiple_fix",
  "source_extraction_id": "c38a9faccfbf419c9353078385291b5b",
  "version": 1,
  "memory_type": "entities"
}
-->