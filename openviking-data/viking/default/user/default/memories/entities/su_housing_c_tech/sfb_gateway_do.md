# 苏服办网关分发请求格式
苏住房C 在开启 VITE_APP_USE_SFB_DISPATCHER=1 后，所有接口统一 POST 到苏服办开放平台 gateway.do，由 header 中的 zs-path 指定真实路径。

## 请求地址与开关
- 开启 VITE_APP_USE_SFB_DISPATCHER=1 后，所有接口统一 POST 到 https://ydzt.jszwfw.gov.cn/jpaas-jags-server/interface/gateway.do
- 苏服办开放平台仅上架 2 个 interface_id（GET 类 / POST 类），替代旧方案每个业务接口单独上架 interface_id

## FormData 字段
- app_id：应用 ID；interface_id：GET 类或 POST 类接口 ID
- biz_content：业务参数 JSON，如 {"pageNum":1,"pageSize":10}
- header：含 Authorization、zs-path、zs-sign 等
- sign：SM3 网关签名；timestamp：时间戳

## 转发机制
- 真实路径由 header 里的 zs-path 告诉后端，后端内部转发
- 改造涉及 dispatcher.js、httpInstance.js、sign.js 等文件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：87362be2-5517-4bea-9e71-248ff12f95d1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "sfb_gateway_do",
  "source_extraction_id": "e97a61b113eb4bd1b76ab8df3477a9d8",
  "version": 1,
  "memory_type": "entities"
}
-->