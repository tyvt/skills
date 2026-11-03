# App业主人工审核新仅存sprite.svg图标
`App业主人工审核新` 名称未在前端业务代码出现，仅作为菜单图标存在于 `zhi2-web-admin/public/assets/images/sprite.svg`（`icon-APP业主人工审核新`）。

## 业务归属
- 对应业务模块为 `ctUserIdentityApply`（业主身份申请/人工审核）
- 列表页组件 `zhi2-web-admin/src/views/property/ctUserIdentityApply/index.vue` 使用 `listMixins` 与 `ListTemplate.js` 渲染

## 验证与归属
- 验证证据：extracted source=cursor session=9ccefa94-018e-4d3e-9072-433fd241659a
- 涉及文件：zhi2-web-admin/src/views/property/ctUserIdentityApply/index.vue、detail.vue、components/OperationBtnGroup/index.vue、mixins/listMixins.js、mixins/detailMixins.js、mixins/table.js、mixins/ListTemplate.js、main.js
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ct_user_identity_icon",
  "source_extraction_id": "0461002868794ce0a74fdf25cc0ae406",
  "version": 1,
  "memory_type": "entities"
}
-->