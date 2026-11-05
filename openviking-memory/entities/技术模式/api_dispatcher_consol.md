# 苏住房C接口调用统一重构
参考既有项目对苏住房C的接口调用进行统一修改，逻辑保持不变，精简文件结构。

## 删除的文件
- api/sfbConfig.js 并入 api/dispatcher.js
- utils/sfbSign.js 并入 api/dispatcher.js
- api/requestLog.js 并入 api/httpInstance.js

## 新增与重构
- api/httpInstance.js：抽取 index.js 与 v1Instance.js 的公共逻辑（请求/响应拦截、dispatcher 封装、接口日志、文件上传）
- api/index.js / api/v1Instance.js：各约 20 行，仅配置 base、token、tag 等差异
- api/dispatcher.js：集中管理苏服办配置、SM3 签名、zs 头组装
- utils/sfb.js：去掉未使用的 getSfbAppId、sfbToast、livenessFaceAuth；isSfbDispatcherEnabled 复用 dispatcher 的 useDispatcher

## 涉及文件与归属
- 涉及 api/sfbConfig.js、api/dispatcher.js、utils/sfbSign.js、api/requestLog.js、api/httpInstance.js、api/index.js、api/v1Instance.js、utils/sfb.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 b5d791be-2fb9-40ed-a41e-ead0373b6962；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_dispatcher_consol",
  "source_extraction_id": "0a3c17d20fbd48f7804787d4f6d0736e",
  "version": 1,
  "memory_type": "entities"
}
-->