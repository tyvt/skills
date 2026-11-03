# 自定义组件标签 class 与 scoped CSS 不生效
苏住房C 小程序中父级布局类写在自定义组件标签上导致 scoped CSS 不穿透、flex 失效，需将布局类下移到内层原生包裹节点。

## 现象与根因
- 公示/公告列表卡片右侧箭头不显示在右侧，被当块级元素堆在日期下方，同一 bug 反复复发。
- 模板把布局类写在自定义组件标签 `<base-card class="notice-list-card">`，而 flex 样式写在页面 scoped 中。
- 小程序端 scoped 只加在组件渲染层，父页面无法给子组件根节点应用 scoped 规则，宿主节点 layout 不被父级 flex 接管。

## 解决方案
- 把布局类从组件标签下移到内层包裹的原生元素 `<base-card><div class="notice-list-card">...`，样式不变，flex 立即作用。
- 推广规则：凡用 flex/grid 控制子组件+兄弟节点排列，一律显式套 div 承载布局类；子组件内部样式用 props 或 :deep()+权重。

## 验证与归属
- 验证证据：会话 0654e8d6 用户反馈「详情页箭头显示有问题，记得之前修复过」，定位根因为 scoped CSS 未穿透，改动 ListIndex.vue 与 ListContractIndex.vue 移 class 到内层 div。
- 验证方式：npm run build 通过，微信开发者工具刷新进「双晒公示→维修资金使用」确认。
- 涉及文件：pages_main/publicNotice/components/ListIndex.vue、ListContractIndex.vue、publicNotice.vue。
- 所属项目：苏住房C；来源会话ID：0654e8d6-e325-415f-81d9-23f35e1436b6；代码基线：bb6d74a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "component_scoped_css",
  "source_extraction_id": "6747cc81848946ff9ebb25b2076973e8",
  "version": 1,
  "memory_type": "entities"
}
-->