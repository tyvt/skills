# 绑定小区公共 Hook 抽取
苏住房C小程序新增 useBoundProjects.js 统一获取业主绑定小区并处理默认选中逻辑。

## 功能要点
- 调用 listComplexCommunitySubdistrictByToken 获取绑定小区列表
- 当 userStore.project 为空（无缓存）且列表有数据时自动选中第一个小区
- 慧物业页小区切换逻辑也收进该 hook 避免两处不一致
- 接口返回空列表时调用 userStore.clearProjectInfo() 清除小区相关缓存字段（project、projectName、community）
- projectList 改为模块级单例，避免多组件各自维护列表状态

## 涉及页面
- Home_Suzhufang.vue 在 onShow 中已登录时调用 loadBoundProjects()
- Property_Suzhufang.vue 复用同一 hook
- 业主倡议等功能依赖 userStore.project 带小区信息
- tabBar.js 新增 onTabPageShow()，tab 切换时统一执行：设置 tabBar 选中态、加载菜单、有 token 时调用 loadBoundProjects()
- 五个 tab 页面（home、property、project、community、my）均在 onShow 中调用 onTabPageShow
- Home_Suzhufang 移除重复的 loadBoundProjects 调用，避免与 tab 页面逻辑重复请求

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：975a7c63-ba48-4d7b-a799-8262cfc26787；30f38fb2-cdce-4fec-b6e7-513b5e74f474

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "bound_projects_hook",
  "source_extraction_id": "cbccc77e23c04a3fb98fe21d70df4ad3",
  "version": 2,
  "memory_type": "entities"
}
-->