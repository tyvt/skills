# 删除未使用的 dispatcher.js 网络层
苏住房C(zhi2-mobile-shimin)删除了未接入的 `dispatcher.js`，仅保留 `gateway.js` 作为苏服办网关封装链路。

## 删除原因
- `dispatcher.js` 项目中无任何 import，属于未接入的备用实现（fetch/uni.request 方案）
- 与 `gateway.js` 重复实现 `sfbConfig`、SM3 签名、网关 header 组装等逻辑

## 保留链路
- 实际在跑的链路：`index.js` / `v1Instance.js` → `httpInstance.js` → `gateway.js`（axios + 苏服办网关封装）
- 后续只需维护 `gateway.js` 与对应环境变量 `VITE_APP_SFB_*`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`dispatcher.js`、`index.js`、`v1Instance.js`、`httpInstance.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：b91754cb-4f69-4526-932a-d2e80e20327e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "dispatcher_removed",
  "source_extraction_id": "3bad886309d54823969374dcd2916583",
  "version": 1,
  "memory_type": "entities"
}
-->