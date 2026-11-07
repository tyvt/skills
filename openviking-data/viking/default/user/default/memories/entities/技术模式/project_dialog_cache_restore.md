# 全局项目选择对话框的缓存恢复
在 layout/home 层，项目选择对话框使用 localStorage + 权限验证来实现稳定恢复，刷新后无需重新打开。

## 现象
- 原始实现每次刷新都会打开项目选择对话框（社区），体验差
- 可见性未与本地缓存关联，刷新后丢失“已选中”状态

## 解决方案
- bProjectDialog.vue 新增 tryRestoreFromCache(): 从 localStorage 读取 currentProjectId，如果在可操作区域列表（权限）中则恢复选择，同步 Vuex，关闭对话框
- 使用 cacheRestored 以避免自动恢复被视为手动切换而导致错误关闭
- layout/index.vue 默认不打开；syncProjectDialogVisibility: 缓存有效则不打开，无效则清除并打开

## 限制
- 缓存必须与权限列表验证；无效则清除并重新打开，不能仅检查 key 是否存在

## 相关
- 涉及文件: zhi2-web-admin/src/views/home/bProjectDialog.vue, index-wrapper.vue, layout/index.vue; 所属项目: 园区物管2.0; 会话: d3445a30-e077-4745-9bfa-b18a1203606d; baseline: 036.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_dialog_cache_restore",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->