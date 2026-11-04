# zsTable 移除 emptyText 逻辑
在兴化物管 zhi1-web-admin 的 zsTable/index.vue 中移除了所有 emptyText 相关逻辑，空状态改由 Element UI 默认文案展示。

## 改动说明
- 模板：删除自定义 empty 插槽（原显示「加载中… / 暂无数据 / 加载失败」）
- data：移除 emptyText 字段
- watch：去掉根据数据为空设置 emptyText 的逻辑，保留 doLayout 调用
- 生命周期：移除 created 及 unhandledrejection 监听（handleError 仅用于设置「加载失败」）
- methods：删除 handleError 方法

## 保留与影响
- 表格空状态使用 Element UI 默认「暂无数据」文案
- .el-table__empty-text 样式仍保留，不影响默认空态展示

## 验证与归属
- 验证证据：extracted source=cursor project=兴化物管
- 涉及文件：zhi1-web-admin/src/components/zsTable/index.vue
- 所属项目：兴化物管（zhi1-web-admin）
- 来源会话：e27192d0-0106-412e-86ca-44489c556107

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_emptytext_removed",
  "source_extraction_id": "e64fb28689f44647bab8e651432d0353",
  "version": 1,
  "memory_type": "entities"
}
-->