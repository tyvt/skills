# 房源限制详情页头部改用公共组件
苏州市房地产监测V3 将项目详情顶部自定义 `detail-header` 改为与同模块 `limitAdd.vue` 一致的公共组件 `operation-btn-group`。

## 改动要点
- 标题由路由 `meta.title` 展示（原硬编码「项目详情」），保留默认「返回」
- 关闭编辑/保存/提交/审批/附件/制单信息/流程查看等默认按钮
- 设置 `form-mode-override="view"`，固定为只读详情
- 「新增限制」「新增解除限制」仍在默认插槽，`data-testid` 与权限未变，E2E 无需调整
- 删除重复的 `detail-header` 样式，沿用全局 `.detail-container > .operation-btn-group` 布局

## 预期行为
- 若菜单标题不是「项目详情」，顶栏文案会跟菜单配置一致，这是使用公共组件后的预期行为

## 涉及文件与归属
- 涉及：`limitAdd.vue`、`building/houseLimit/detail.vue`、`detail-template.vue`、`building/houseLimit/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：c1794d0c-f9d8-4c97-ba50-e2d018685942；验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "limit_detail_header",
  "source_extraction_id": "d43c17bee8564355a22797fedfa17728",
  "version": 1,
  "memory_type": "entities"
}
-->