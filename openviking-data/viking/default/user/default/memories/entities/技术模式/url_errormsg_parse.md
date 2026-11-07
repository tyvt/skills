# 跨系统跳转携带 errorMsg 的解析套路（产品2.0）
产品2.0 hash 路由下外部系统通过 URL 带回错误文案，需在根实例挂载后用 location.search 优先 + $route.query 兜底解析并弹出。

## 问题现象
- 外部系统（单点登录、门户跳转）通过 URL 把错误文案带回本系统，进入应用后需自动弹出错误提示
- 根实例刚挂载时 $route 可能未完成首次解析，直接读会拿到 undefined

## 根因
- 本项目是 hash 路由，外部拼接地址有两种形态：错误参数在 # 之前（?token=…&errorMsg=…#/…，读 $route.query 拿不到）和在 # 之后（#/login?errorMsg=…）
- 重复参数在 vue-router 里会解析成数组

## 解决方案
- 在 main.js 的 createInstance 中、根实例挂载完成后的 $nextTick 里执行 pickErrorMsgFromUrl(vm)
- 先读 window.location.search 的 errorMsg（覆盖 # 之前形态），再回退 vm.$route.query.errorMsg
- 若取到数组取第一个；用 instance.$message.error 展示（Element 的 $message 在 Vue.use(Element) 后才挂原型，时序上必须在其之后）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/main.js
- 所属项目：产品2.0；来源会话：a70a9913-e202-4f48-9ff9-a75c6d3d3699；基线：183f795 / c420af5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "url_errormsg_parse",
  "source_extraction_id": "aa6a9cc932774c7691d3f30fa719d440",
  "version": 1,
  "memory_type": "entities"
}
-->