# 区域开户新增编辑须携带 openAccBS '2'
原 zhi2-web-admin 区域开户 detail.vue 中 form.openAccBS 默认 undefined 且 getForm() 未返回，致 POST/PUT /maintenance/account 请求体缺参。

## 问题根因
- detail.vue 中 form.openAccBS 默认值为 undefined
- getForm() 未返回 openAccBS 字段，导致 addRequest()/editRequest() 调用时请求体缺参

## 解决方案
- 将 form.openAccBS 默认值置 '2'
- 在 getForm() 显式返回 openAccBS: '2'，供 form.js 的 addRequest()/editRequest() 调用携带

## 验证与归属
- 验证：extracted source=cursor session=ff5a7c00-ebe9-4246-8cf1-277a6aafbe76
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/complex/detail.vue、index.vue、mixins/detailMixins.js、components/detail.vue、mixins/form.js、accountQuery/type.vue、router/index.js、utils/ruoyi.js
- 来源会话：ff5a7c00-ebe9-4246-8cf1-277a6aafbe76；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_open_openaccbs",
  "source_extraction_id": "51146e819e2648e6a9106f0127108af7",
  "version": 1,
  "memory_type": "entities"
}
-->