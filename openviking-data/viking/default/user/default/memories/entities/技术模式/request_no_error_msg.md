# 请求配置跳过全局错误提示
当页面需自行用弹层展示接口错误时，在 request 调用配置加 noErrorMsg 标记，由响应拦截器跳过默认错误 toast。

## 适用场景
- 页面要用 zs-popup error 类型自行展示接口错误，而非全局 message 提示
- 调用 request 时传入 noErrorMsg（或等价）标记

## 解决方案
- 响应拦截器识别 noErrorMsg 配置后跳过默认错误提示
- 页面内部捕获 res 自行展示错误弹层

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证：004.md 会话中 src/request/index.js 增加配置不提示接口错误返回信息，由页面处理
- 涉及文件：src/request/index.js、src/components/zs-popup/zs-popup.vue、src/App.vue
- 来源会话ID：86d428a7-ae46-4ef6-9e04-9cc6aa14eeb3
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "request_no_error_msg",
  "source_extraction_id": "da4bc13626ae49b984d5097a7818c176",
  "version": 1,
  "memory_type": "entities"
}
-->