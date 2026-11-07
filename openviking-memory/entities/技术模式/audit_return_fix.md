# 审核状态返回后无法选中修复
泰兴G 项目 ctUserIdentityApply 模块在详情返回列表后，审核状态下拉无法选中的 bug 修复套路。

## 问题根因
- 返回列表时先恢复缓存的 auditStatus，但 SearchFormItem.vue 中单选 select 使用动态 component 与 .sync 导致绑定异常
- 字典加载完成后未强制重建组件，多选/单选混合分支导致选中态丢失

## 修复内容
- SearchFormItem.vue：将单选 select 拆出，用 :value.sync 绑定，v-bind 替代 v-bind.sync，key 增加 options.length 强制重建
- ctUserIdentityApply/index.vue：queryParams 补充 auditStatus: undefined 和 hasComplex: undefined 保证响应式
- SingleSelect.vue：beforeDestroy 清理 body 的 popperElm，避免详情页下拉残留遮罩

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 验证：进入APP业主人工审核新列表，选审核状态搜索写缓存，进详情返回后确认可正常展开选择
- 涉及文件：SearchFormItem.vue、ctUserIdentityApply/index.vue、SingleSelect.vue
- 所属项目：泰兴G；来源会话：66934bc9-8b42-436a-a460-aad83c154ca3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_return_fix",
  "source_extraction_id": "711b02c3051d41118a09a64828ded27d",
  "version": 1,
  "memory_type": "entities"
}
-->