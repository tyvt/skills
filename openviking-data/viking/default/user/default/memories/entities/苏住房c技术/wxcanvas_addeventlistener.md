# ECharts 5.3+ 初始化报 el.addEventListener is not a function
苏住房C 小程序用 echarts-uniapp 渲染图表时，因 WxCanvas 缺 DOM 事件接口导致 ZRender 初始化抛错、图表空白。

## 问题现象
- uni-app 小程序用 pages_benefit/components/echarts-uniapp 渲染图表（如「资金公示」balancePublicity 页），控制台报 initChart error: TypeError: el.addEventListener is not a function
- 调用栈从 ZRender → HandlerDomProxy → mountLocalDOMEventListeners 一路抛错，图表整块空白
- 堆栈全在 vendor.js，易误判为 echarts 包被裁剪坏而去折腾构建配置

## 根因
- 项目用 ECharts 5.4.1（5.3+），ZRender 初始化 canvas 时直接在容器元素上 addEventListener/removeEventListener 绑定 DOM 事件
- echarts-uniapp 的自定义 WxCanvas（wx-canvas.js）只实现旧 attachEvent/detachEvent，无 addEventListener，ZRender 构造 HandlerDomProxy 必然抛错
- 低版本 ECharts 不暴露，升级后必然失败

## 解决方案
- 在 wx-canvas.js 的 WxCanvas 类补空实现 addEventListener() {} 与 removeEventListener() {}，注释「ECharts 5.3+ 需要，小程序 canvas 无真实 DOM 事件」
- 触摸交互不依赖此链路，仍由组件模板 @touchstart/@touchmove/@touchend 手动转发给 ECharts，空实现不影响缩放/提示
- 排查提示：小程序端 echarts 报错优先核对「ECharts 版本要求 vs WxCanvas 适配层实现方法」，而非先怀疑裁剪包 series 缺失（那类根因表现为静默空白无报错）

## 验证与归属
- 会话 8cedd4de（基线 5f0f4dc）：用户贴出完整堆栈，定位 WxCanvas 只实现 attachEvent/detachEvent，补 addEventListener/removeEventListener 空实现后图表恢复
- 涉及文件：src/pages_benefit/components/echarts-uniapp/wx-canvas.js、echarts-uniapp.vue、echarts-instance.js、src/pages_benefit/balancePublicity/index.vue
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "wxcanvas_addeventlistener",
  "source_extraction_id": "5bb7ea354f264d7a85462f53c9ba0596",
  "version": 1,
  "memory_type": "entities"
}
-->