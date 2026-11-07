# 缓存恢复未重建select致审核状态失效
从详情返回列表恢复缓存时，动态组件 attrs 双向同步副作用且 key 未变，单选 select 未重建致 queryParams 缺失响应式字段。

## 问题根因
- 从详情返回列表恢复缓存时，动态 <component> 的 v-bind.sync 引发 attrs 双向同步副作用
- key 未随字典加载变化，单选 select 未重建，queryParams 缺失响应式字段，审核状态失效

## 解决方案
- SearchFormItem.vue 拆出单选 zs-select 并改用 :value.sync，key 增 options.length
- ctUserIdentityApply/index.vue 补 auditStatus: undefined 与 hasComplex: undefined
- SingleSelect.vue 于 beforeDestroy 清理 popperElm

## 验证与归属
- 验证：extracted source=cursor session=66934bc9-8b42-436a-a460-aad83c154ca3
- 涉及文件：package.json、property/ctUserIdentityApply/index.vue、mixins/listMixins.js、mixins/ListTemplate.js、mixins/table.js、components/zs-search-form/zs-search-form.vue、property/appOwnerAudit/index.vue、components/zs-search-form/SearchFormItem.vue
- 所属项目：泰兴G/zhi2-web-admin；代码基线：none；来源会话：66934bc9-8b42-436a-a460-aad83c154ca3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cache_select_bug",
  "source_extraction_id": "b6ef5637059a4f3f841af431095bf281",
  "version": 1,
  "memory_type": "entities"
}
-->