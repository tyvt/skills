# 首次打开弹窗闪烁修复
园区物管2.0 中 bProjectDialog 首次打开出现遮罩闪烁与空状态跳动，根因为重复挂载、数据未就绪打开、打开重复初始化。

## 问题现象
- 首次点击打开项目选择弹窗时遮罩层闪烁
- 弹窗先显示「暂无可用物业区域」，数据到达后切换成列表，造成内容跳动

## 根因
- 重复挂载：`layout/index.vue` 与 `Navbar.vue` 各有一个 `bProjectDialog`，两个 `el-dialog` 同时挂在 body 上
- 数据未就绪就打开：`layout` 的 watcher 在 `bProjectData` 请求完成前就把 `projectDialogVisible` 设为 true
- 打开时重复初始化：`onOpen` 里再次调用 `initRegionList()` 重建列表触发重渲染

## 解决方案
- `Navbar` 移除重复的 `bProjectDialog`，点击项目名称时通过 `open-project-dialog` 事件通知父组件打开弹窗
- `layout` 统一管理弹窗状态；等项目列表接口返回后再决定是否自动弹出；新增 `openProjectDialog` 供 Navbar 调用
- `bProjectDialog` 新增 `dataLoading`，加载中显示 loading 不显示空状态；`onOpen` 不再重复调用 `initRegionList`；仅在必要时初始化

## 验证与归属
- 验证证据：src=园区物管2.0
- 涉及文件：zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/views/home/bProjectDialog.vue、zhi2-web-admin/src/mixins/dialogMixins.js
- 所属项目：园区物管2.0；代码基线 none；来源会话 99e0bdb9-a041-402c-9293-6e332ef231d4


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_flicker_fix",
  "source_extraction_id": "6c57e8ad6f474e96b0c7179f993c550f",
  "version": 1,
  "memory_type": "entities"
}
-->