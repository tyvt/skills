# 苏服办网关统一转发模式
苏住房C 按江苏省「苏服办」接入规范改造接口层，后端只上架 2 个统一转发接口，前端统一请求、后端内部转发到真实业务接口。
## 背景与目的
- 苏服办开放平台（ydzt.jszwfw.gov.cn/jpaas-jags-server/interface/gateway.do）要求请求头带 zs- 前缀参数并做 SM3 签名，本地开发无网关注入会全部失败，生产必须走网关拿免登录凭证
- 宿迁同源项目旧做法为每个业务接口上架一个 interface_id，苏住房C 未迁移该配置导致文档要求的 gateway.do 不存在
## 解决方案
- 开放平台只上架 2 个 interface_id（GET/POST），前端统一 POST 到 gateway.do，真实业务路径放 formData 的 header.zs-path，后端解析后内部转发，业务代码一行不改
- 开启 VITE_APP_USE_SFB_DISPATCHER=1 后 dispatcher.js 构建 formData{app_id, interface_id, biz_content, header(Authorization+zs-path+zs-sign+zs-timestamp+zs-nonce), sign(SM3), timestamp, charset, origin, version}
- httpInstance.js 网关模式直连网关地址并解析响应；sign.js 跳过对 gateway.do 重复签名；.env.* 新增 VITE_APP_SFB_GATEWAY_URL 与两个 INTERFACE_ID；vite.config.ts 加 /sfb-gateway 代理绕 CORS
- api/dispatcher.js 集中管理苏服办配置与 zs- 请求头组装，index.js/v1Instance.js 只保留 base、token、tag 等差异；请求日志打印请求头/地址/参数/响应体便于定位
## 验证与归属
- 涉及文件：src/api/dispatcher.js、src/api/httpInstance.js、src/api/index.js、src/api/v1Instance.js、src/utils/sign.js、src/static/js/sign.js、src/utils/sfb.js、.env.*、vite.config.ts、宿迁苏服办/src/api/gateway.js、宿迁苏服办/src/request/index.js、宿迁苏服办/src/api/config.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 b5d791be 与 87362be2；代码基线 83c4136 与 8b5f883

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sfb_dispatcher_gateway",
  "source_extraction_id": "eda857c276dd4b41a6be633cb004b45e",
  "version": 3,
  "memory_type": "entities"
}
-->