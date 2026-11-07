# 物业端自定义tabBar致switchTab静默失败
泰兴小程序物业端 tabBar 为 custom:true 时 uni.switchTab 静默失败，选中小区后停留原页，改用 uni.reLaunch 可靠跳回目标 tab。

## 问题根因
- 项目 tabBar 为 "custom": true 自定义模式，StaffCustomTabbar 还会调 uni.hideTabBar。
- 原代码用 setTimeout(250) + uni.switchTab(...)，此状态下 switchTab 静默失败（无回调、不跳转）。
- src/staff/pages/complex-select/index.vue 的 handleSelect 选中小区后停留原页无法跳转。

## 解决方案
- 改用 uni.reLaunch(returnTab) 替代 uni.switchTab，可靠关闭所有页面并打开目标 tab，不受自定义 tabBar/页面栈影响，清空返回栈。
- 加 fail 兜底：reLaunch 失败时再兜底 reLaunch 回物业端首页，并用 console.warn 记录原因（生产构建保留 warn）。
- returnTab 为物业端首页（及工作台/组织/统计/登录页等链路）。

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序（原 src=泰兴小程序/010.md）。
- 涉及文件：src/staff/pages/complex-select/index.vue、src/pages/index/components/complexCard.vue、src/pages/index/newHome.vue、src/staff/components/StaffCustomTabbar/StaffCustomTabbar.vue 等。
- 来源会话ID：86ee6d91-474f-47ce-90e2-2b4e4363811b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "custom_tabbar_switchtab_fail",
  "source_extraction_id": "d0e22eb5dac845d1a38d305efc1b5c08",
  "version": 2,
  "memory_type": "entities"
}
-->