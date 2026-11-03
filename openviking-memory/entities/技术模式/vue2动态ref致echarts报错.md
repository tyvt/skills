# Vue2 v-for动态ref返回DOM数组致echarts报错
Vue2 中 v-for + 动态字符串 :ref 场景下 $refs[name] 是 DOM 数组而非单个元素，直接传给 echarts.init 会因内部调用 dom.getContext 崩溃。

## 问题现象
- echarts.init(this.$refs.xxx) 报 Uncaught TypeError: this.dom.getContext is not a function
- 报错栈指向 Layer.js / chartRenderers.js 的 echarts 内部，极易误判为 echarts 版本或裁剪包问题
- 与「ref 写错名字」不同，报错点在 echarts 内部而非 undefined ref

## 根因
- Vue 2 动态字符串 :ref 在 v-for 场景下，$refs[name] 是 DOM 数组 [div] 而非单个元素
- echarts.init 拿到数组后内部调用 dom.getContext 崩溃

## 解决方案
- 抽 asChartDom() 工具，在 echarts.init 前统一解包：数组取 [0]、组件实例取 $el
- 页面侧所有图表 ref 统一走 resolveRef(name) 读取，不直接访问 this.$refs
- 凡 v-for 批量初始化图表（多卡片仪表盘场景）都应内置这层解包

## 验证与归属
- 验证：会话 d6bc9dfb 精简代码后 7 个图表全部崩溃，报错栈指向 echarts 内部 getContext；修复为 chartRenderers.js 增加 asChartDom() + index.vue 增加 resolveRef(name)
- 验证证据：src=园区物管2.0/029.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/chartRenderers.js、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、zhi2-web-admin/src/views/benefit/mapOverview/dataHelpers.js、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/mock.js、zhi2-web-admin/src/views/benefit/dataSandbox/pieLegendHover.js、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/chartConstants.js、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/dataHelpers.js
- 所属项目：园区物管2.0；代码基线 6a4835a08；来源会话 d6bc9dfb-c8b6-4de2-ad34-79103343d6dd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "Vue2动态ref致echarts报错",
  "source_extraction_id": "7573fea884d54cc7a5763884e2477eaa",
  "version": 2,
  "memory_type": "entities"
}
-->