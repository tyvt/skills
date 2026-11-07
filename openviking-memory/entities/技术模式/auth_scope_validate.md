# 用户详情保存时授权范围校验
园区物管2.0 的 zhi2-web-admin 在 system/user/detail.vue 重写 beforeSaveHook，保存时校验授权范围不为空。

## 实现要点
- 点击保存（表单校验通过后、真正发请求前）检查树组件勾选节点
- 未勾选任何授权范围：弹出提示「授权范围不能为空」并阻止保存提交
- 已勾选：正常继续保存
- getForm() 增加空引用保护，避免 tree 未渲染时直接报错

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/system/user/detail.vue、zhi2-web-admin/src/mixins/detailMixins.js、zhi2-web-admin/src/mixins/form.js
- 所属项目：园区物管2.0
- 来源会话：b62c693b-964b-4ea2-85e8-10ced80ddbfd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_scope_validate",
  "source_extraction_id": "18bb029c698a48dcbda633e8f296ab54",
  "version": 1,
  "memory_type": "entities"
}
-->