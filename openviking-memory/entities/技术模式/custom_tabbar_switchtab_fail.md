# 物业端自定义tabBar致switchTab静默失败
泰兴小程序物业端 tabBar 为 `custom: true` 时 `uni.switchTab` 静默失败，选中小区后停留原页，改用 `uni.reLaunch` 可靠跳回目标 tab。

## 问题根因
- 项目 tabBar 为 `custom: true` 时 `uni.switchTab` 静默失败无回调。
- `src/staff/pages/complex-select/index.vue` 的 `handleSelect` 选中小区后停留原页无法跳转。

## 解决方案
- 改用 `uni.reLaunch(returnTab)` 并加 `fail` 兜底 reLaunch 首页，清空返回栈可靠跳回目标 tab。

## 验证与归属
- 验证证据：src=泰兴小程序/010.md
- 涉及文件：src/pages/index/components/complexCard.vue、src/pages/index/newHome.vue、src/staff/pages/complex-select/index.vue、src/pages.json、src/pages/staff/home/index.vue、src/staff/store/user.js、src/staff/components/StaffCustomTabbar/StaffCustomTabbar.vue、src/staff/hooks/useAuthPage.js
- 来源会话ID：86ee6d91-474f-47ce-90e2-2b4e4363811b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "custom_tabbar_switchtab_fail",
  "source_extraction_id": "076fb3abe2994198a7216abbac25264f",
  "version": 1,
  "memory_type": "entities"
}
-->