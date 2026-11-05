# 决策项选择后不显示且提交无数据修复
泰兴小程序决策页选完决策项后「我的选择」为空、提交无数据，根因是子组件生命周期与路由跳转方式错误，已修复。

## 问题根因
- `ViewOptionsList.vue` 子组件内误用页面生命周期 `onLoad`，`uni.getStorageSync('decisionInfoList')` 从未执行，`decisionInfoList` 恒为 `[]`。
- `OptionCardList.vue` 的「下一步」用 `goto`（`navigateTo`）从 `multipleForm` 跳到同路由 `multipleForm?mode=view`，微信小程序限制不能对当前页路径再 `navigateTo`。

## 解决方案
- `ViewOptionsList.vue` 去掉 `onLoad`，改在 `onMounted` 且 `!isVotedOrResult` 时读取 `decisionInfoList` 缓存，校验非空数组后再赋值。
- `OptionCardList.vue` 的「下一步」改用 `redirectTo` 关闭当前页再打开 `mode=view` 实例，符合确认页预期。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_owner/decision/multipleForm.vue、src/pages_owner/decision/components/multiple/ViewOptionsList.vue、src/store/vote.js、src/pages_owner/decision/components/multiple/OptionCardList.vue
- 来源会话ID：929fd106-a6ce-450a-b1b3-7746d49574d5
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_view_options_fix",
  "source_extraction_id": "d785119f5bb249119c9e3f841e480587",
  "version": 1,
  "memory_type": "entities"
}
-->