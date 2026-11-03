# 首页 tab 切换清空小区缓存模式
首页多 tab 切换时按绑定小区列表刷新缓存，空列表必须清掉本地小区信息，避免幽灵小区。

## 现象与根因
- 苏住房C 首页多 tab（home/property/project/community/my）各自展示小区数据，解绑全部小区后页面仍显示旧小区名与旧数据。
- 小区信息持久化在 user store（project/projectName/community 等），仅进入时拉一次；解绑后未触发清空，形成幽灵小区。
- 多组件各自持有 projectList 导致列表状态不一致。

## 解决方案
- userStore 增加 clearProjectInfo() 集中清空 project、projectName、community 等小区字段。
- useBoundProjects.js 将 projectList 提为模块级单例，接口返回空数组时调 clearProjectInfo()。
- 抽 tabBar.js 的 onTabPageShow() 统一处理 tab 切换：设置选中态+加载菜单+有 token 时调 loadBoundProjects()。
- 五个 tab 页 onShow 调用 onTabPageShow；Home_Suzhufang 删除重复 loadBoundProjects 调用。
- 行为：有小区保持/自动选第一个，无小区清缓存。

## 验证与归属
- 验证证据：会话 30f38fb2（2026-08-04，基线 ce9e460）用户诉求「tab 页面切换时，如果小区列表为空，则清除缓存」。
- 涉及文件：src/hooks/useBoundProjects.js、src/store/user.js、pages/index/property.vue、components/Property_Suzhufang.vue 等。
- 所属项目：苏住房C；来源会话ID：30f38fb2-cdce-4fec-b6e7-513b5e74f474；代码基线：ce9e460。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_tab_clear_project",
  "source_extraction_id": "6747cc81848946ff9ebb25b2076973e8",
  "version": 1,
  "memory_type": "entities"
}
-->