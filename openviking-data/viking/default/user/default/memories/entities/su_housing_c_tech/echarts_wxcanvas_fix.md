# ECharts小程序画布事件兼容修复
苏住房C小程序中ECharts 5.3+初始化报`el.addEventListener is not a function`，已在WxCanvas补空实现修复。

## 问题原因
- 项目使用ECharts 5.4.1，初始化时ZRender在canvas绑定DOM事件
- 微信小程序无真实DOM，`echarts-uniapp`的`WxCanvas`只实现`attachEvent`/`detachEvent`，缺`addEventListener`
- 导致图表初始化失败

## 修改内容
- 在`wx-canvas.js`的`WxCanvas`类补充空实现`addEventListener()`与`removeEventListener()`
- 触摸交互仍由组件模板`@touchstart`等手动转发给ECharts，不依赖DOM事件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`wx-canvas.js`、`echarts-uniapp.vue`、`balancePublicity/index.vue`、`budget/index.vue`
- 来源会话ID：8cedd4de-3840-43fc-828d-12511bc40dc9

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "echarts_wxcanvas_fix",
  "source_extraction_id": "72981d96a43e4556801acb220899f2b0",
  "version": 1,
  "memory_type": "entities"
}
-->