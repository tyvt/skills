# 新增态隐藏配置型子表
应用管理详情页中，新增态应使用 v-if="formMode !== 'add'" 隐藏集成回调配置子表，并从提交体剔除该字段。

## 问题根因
- 配置型子表（如 EndpointTable）依赖主表已落库的主键才能挂载关联数据
- 新增态主键不存在，展示子表只能填无法落库的行，且诱导用户以为可一起提交

## 解决方案
- 在 detail.vue 给子表加 v-if="formMode !== 'add'"，仅编辑/查看态渲染
- 提交数据新增分支不再带 endpoints 字段，避免后端收空数组或半成品
- 产品流程变两步：新增填基本信息 → 保存后进入查看页才出现子表
- 与「用主键存在性控显隐、不用 formMode」（#1042 后置模块）互补；显隐与提交体必须成对改

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/system/syncLog/index.vue；zhi2-web-admin/src/views/system/menu/index.vue
- 所属项目：产品2.0
- 来源会话ID：d9f3c68c-3ec6-4725-adf0-590b032f0388
- 代码基线：1d563df

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "formmode_subtable_hide",
  "source_extraction_id": "2c4fb9e23b1f49d3949a5b972ee566fe",
  "version": 1,
  "memory_type": "entities"
}
-->