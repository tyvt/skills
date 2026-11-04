# 用户授权页按模板实现
园区物管2.0 中 autonomy/userAuth 详情/新增/编辑页按 procedure/detail.vue 模板实现并复用既有混入。

## 实现要点
- 在 autonomy/userAuth/detail.vue 按 procedure/detail.vue 模板实现用户授权详情/新增/编辑页
- 沿用 detailMixins + Headline + DetailTemplate 组合
- 底栏 operation-btn-group 设 biz-state='0'、showSubmit='false'
- 字段与 index.vue 对齐

## 验证与归属
- 来源会话：c9a03628-31e0-4f0e-bc33-82c25af46a98
- 涉及文件：dataProperty/procedure/detail.vue、autonomy/userAuth/index.vue、autonomy/userAuth/detail.vue、autonomy/general/detail.vue、mixins/detailMixins.js、autonomy/ownerCommitteeWorker/detail.vue、mixins/form.js、dataProperty/procedure/index.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "user_auth_template_impl",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 2,
  "memory_type": "entities"
}
-->