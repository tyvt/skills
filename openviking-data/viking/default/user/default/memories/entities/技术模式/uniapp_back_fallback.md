# uni-app 刷新后返回按钮失效兜底
刷新后页面栈被重建为 1 层，navigateBack 静默失败，需用栈深分支到 reLaunch 兜底。

## 现象
- 历史详情页返回按钮在刷新页面后点不动，页面还在但无反应；从列表进入时正常。
- 该类 bug 用「列表→详情→返回」正常路径永远测不出来。

## 根因
- uni-app 页面栈在 H5 刷新 / 小程序重新进入后被重建，栈深变成 1。
- uni.navigateBack 在只有 1 层时静默失败：不报错也不跳转，表现为返回按钮失效。

## 解决方案
- 抽离 useBack.ts 统一处理返回：取当前页面栈深度，栈深 >1 才 navigateBack，否则 reLaunch 跳兜底页。
- 业务页面禁止散落 navigateBack 调用，全部走该 composable。
- 兜底页选一定存在的页面（如首页/列表页），避免 reLaunch 到未注册路由白屏。
- 页面栈深度用 uni 官方 API 读取，不要自维护计数器（刷新后失真）。
- 回归覆盖两条路径：列表→详情正常返回，与刷新后直接返回兜底（易漏测）。

## 关联信息
- 涉及文件：src/composables/useBack.ts、src/pages/history/index.vue。
- 所属项目：uni-app Vue3 + TypeScript + Pinia + z-paging 工作台；来源会话：5ff6b6db-7cd5-4fef-9b29-75110106902c；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uniapp_back_fallback",
  "source_extraction_id": "cdf303e2f7c24a1c81233edc438de6ce",
  "version": 1,
  "memory_type": "entities"
}
-->