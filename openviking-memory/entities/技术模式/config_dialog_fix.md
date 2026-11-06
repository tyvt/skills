# 园区公共收益 工作流配置弹窗流程名修复
园区公共收益项目 ConfigDialog.vue 的 onFlowChange 因 flowOptions 映射为字典格式导致找不到项报错，已改用 zs-select 的 :label.sync 修复。

## 问题原因
- onFlowChange 用 `this.flowOptions.find((e) => e.id == item).name` 取值
- flowOptions 在 getFlowList 中被映射为 `{ dictLabel: e.name, dictValue: e.id }` 字典格式
- `find((e) => e.id == item)` 永远返回 undefined，访问 .name 报错
- `@change` 传入的是选中值（dictValue）而非完整对象

## 修复方案
- 移除 onFlowChange，改用 `zs-select` 自带的 `:label.sync`，由组件选中时自动同步流程名称
- 写法与同页「组织机构」保持一致

## 涉及文件
- zhi2-web-admin/src/views/tool/workflow/components/ConfigDialog.vue
- zhi2-web-admin/src/components/zs-select/zs-select.vue
- zhi2-web-admin/src/components/zs-select/SingleSelect.vue

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：4659e580-4acf-439b-89b7-52c74726a8d6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "config_dialog_fix",
  "source_extraction_id": "d0846b77e3174058abe8f842a0c0bb59",
  "version": 1,
  "memory_type": "entities"
}
-->