# zs-table
zhi2-web-admin 的底层共用表格组件，被列表页、详情页 Tab 子表、弹窗表格共同消费。

## 方法改名回归风险
- 给 zs-table 新加/改名方法（如 shouldUseAutoHeight，替换原固定表格高度/留白策略）时，若漏掉任一并存旧实现（方法定义、mixin 或旧行数计算入口），mounted 钩子调用会拿到 undefined，报 this.xxx is not a function。
- 实例：detail 页报「Error in mounted hook: TypeError: this.shouldUseAutoHeight is not a function」，调用链 zs-tabs → Headline → DecisionRangeTable → zs-table；DecisionRangeTable 在 autonomy/multiply 与 autonomy/general 多目录存在副本。
- 报错栈位置（如 DecisionRangeTable/detail.vue）只是首个使用方而非元凶；应先 git log 找 zs-table 最近改动提交，git show 看清删了哪个方法名，再全仓 grep 旧方法名一次性替换。
- 验证须覆盖三类消费方：普通列表页、详情页 Tab 子表、弹窗内表格，逐页确认表格高度与数据正常。
- 注意与已知条目 #1000（syncFillHeight 误关满页撑高、did 与 shouldSparseAutoHeight 同源）区分：那条讲高度判定口径，本条讲方法缺失后的全仓回归面与定位方法。

<!-- MEMORY_FIELDS
{
  "category": "程序组件",
  "name": "zs_table",
  "source_extraction_id": "e291f717946845139744abecf28fd921",
  "version": 1,
  "memory_type": "entities"
}
-->