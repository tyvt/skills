# 接口异常 MessageBox 弹窗暂时隐藏
园区物管2.0 在 axios 响应拦截器暂时注释两处接口异常 MessageBox 弹窗，保留 401 提示。

## 修改内容
- 修改文件：zhi2-web-admin/src/utils/request.js 的 axios 响应拦截器
- 暂时注释「业务码非 200」（HTTP 200 但 code != 200）的 MessageBox 弹窗
- 暂时注释「请求失败」（网络错误、超时、HTTP 错误等）的 MessageBox 弹窗
- 接口仍会 Promise.reject，业务侧 catch 逻辑不受影响
- 401 登录过期的提示弹窗保留，未改动

## 恢复方式
- 取消对应 MessageBox.confirm 的注释即可恢复弹窗
- 若某接口要单独弹窗，可在请求配置加 noMessage: true（当前弹窗已关闭，该配置暂时无实际作用）

## 验证与归属
- 所属项目：园区物管2.0；来源会话：e4c07993-740c-4ed4-936b-ea9e9f31c8b1；验证证据：cursor 会话提取

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "request_popup_hidden",
  "source_extraction_id": "784cf794014b4cfc855ed72d1d2da8a2",
  "version": 1,
  "memory_type": "entities"
}
-->