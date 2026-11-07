# 小程序与 H5 通信方案
i淮安项目中小程序与 H5（web-view）通信的常用方案与取舍。

## 可选方案
- URL 参数（启动参数）：小程序打开 web-view 时带参给 H5，最简单稳定，但仅初始化单向
- wx.miniProgram.postMessage + web-view @message：官方能力、接入成本低，但非强实时、生命周期触发
- wx.miniProgram.navigateBack + 页面栈/全局状态：业务闭环稳定，但偏流程式，不适合持续双向
- 后端中转（推荐业务主链路）：H5 写后端、小程序轮询读取同一状态，最稳可追踪审计、端间解耦，需接口与状态设计
- 轮询：实现快，但有延迟耗资源，适合短期过渡
- WebSocket（经后端）：强实时双向体验最好，但服务端复杂度高

## 建议
- 若场景为「登录结果必须可靠到达」，主链路采用后端中转保证可靠交付

## 验证与归属
- 验证证据：extracted source=cursor session=13c153e8-478a-41cb-b96b-542c5621b6d8
- 涉及文件：src/pages/index/home.vue
- 所属项目：i淮安公版；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "miniprogram_h5_communication",
  "source_extraction_id": "6b6b7a1e838b47d5a987671a16add438",
  "version": 1,
  "memory_type": "entities"
}
-->