- 凡是渲染依赖多个接口且模板有 if/else 分支的页面，必须「进页面即 loading，全部接口返回后再渲染」，避免先闪空态或假分支跳变
- 统一使用 hook src/hooks/usePageLoading.js，返回 { loaded, runWithLoading }；runWithLoading 内先 loaded.value=false、uni.showLoading({title:'加载中',mask:true})，Promise.resolve(task()).finally() 置 loaded.value=true 并 hideLoading
- 页面根节点写 v-if="loaded"，所有 if/else 内容数据就绪后才挂载
- 多个接口必须用 Promise.all([...]) 一起交 runWithLoading，不能只 await 主接口
- hook 内部用 onHide/onUnload 兜底 hideLoading，避免页面切走时 loading 常驻
- 已在决策模块 13 个页面落地（decision/index.vue、DecisionResult/ResultStatistics/DecisionRecord、detail.vue、optional/detail.vue）；仅解决首屏跳变，与列表分页 z-paging loading 两套勿混用

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "带if/else分支页面加载方式",
  "source_extraction_id": "e7a2252951194cffbb15456ad5c1f854",
  "version": 1,
  "memory_type": "preferences"
}
-->