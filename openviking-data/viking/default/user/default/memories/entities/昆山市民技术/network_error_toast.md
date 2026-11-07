# 后端接口连接异常为网络层失败
昆山市民小程序中「后端接口连接异常」提示来自 axios 响应拦截器对 Network Error 的兜底文案，非业务错误码。

## 错误来源
- `src/request/index.js` 的 axios 响应拦截器中，当 `error.message === "Network Error"` 时文案改为「后端接口连接异常」
- 另含 `timeout` 映射「系统接口请求超时」、`Request failed with status code` 映射「系统接口XXX异常」

## 含义与排查
- 该提示表示请求根本未连上服务端：域名不可达、未配置合法域名、HTTPS 证书、服务宕机等
- 不是接口返回 `code != 200` 的业务错误

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：src/request/index.js、App.vue、home.vue
- 所属项目：昆山市民；来源会话ID：33ab37e2-0079-458d-a791-5eab0baa4197；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "network_error_toast",
  "source_extraction_id": "a93b55d09bbe4c6588e6a370b98e3c85",
  "version": 1,
  "memory_type": "entities"
}
-->