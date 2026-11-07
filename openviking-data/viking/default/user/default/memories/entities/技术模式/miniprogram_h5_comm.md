# 小程序与 H5 通信方案选型
i淮安公版项目中小程序与 H5（web-view）通信有多种可选方案，按实时性/稳定性有不同取舍。

## 可选方案
- URL 参数（启动参数）：小程序打开 web-view 时带参给 H5；最简单稳定，但仅初始化单向
- `wx.miniProgram.postMessage` + `web-view @message`：官方能力接入成本低，但时机触发非强实时
- `wx.miniProgram.navigateBack` + 页面栈参数/全局状态：业务闭环稳定，但偏流程式不适持续双向
- 后端中转（推荐主链路）：H5 写后端、小程序轮询/刷新读状态；最稳可追踪可重试可审计、端间解耦，需接口与状态设计
- 轮询：实现快，但有延迟耗电耗流量，适合短期过渡
- WebSocket（经后端）：强实时双向体验最好，但服务端复杂度高（连接管理、重连、鉴权）

## 适用建议
- 若场景为“登录结果必须可靠到达”，建议主链路采用后端中转

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版
- 涉及文件：src/pages/index/home.vue
- 所属项目：i淮安公版；来源会话：13c153e8-478a-41cb-b96b-542c5621b6d8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "miniprogram_h5_comm",
  "source_extraction_id": "c92a3dfa52c34609806fbce67331f399",
  "version": 1,
  "memory_type": "entities"
}
-->