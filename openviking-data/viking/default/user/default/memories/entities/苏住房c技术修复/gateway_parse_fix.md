# 苏服办网关响应体解析修复
苏住房C小程序请求苏服办网关时因响应体解析错误导致业务数据异常，已定位根因。

## 问题根因
- 网关返回 code:0、success:true 被当作网关成功，真实错误在 msg:"请求异常"
- data 为字符串 "null" 而非 JSON 对象
- gateway.js 旧逻辑将 "null" 直接当业务数据下传，未进入空值分支
- httpInstance.js 因字符串 "null" 无 code/msg 字段走兜底逻辑

## 修复方向
- 需修正 gateway.js 对 data 为 "null" 字符串的判定，避免误当业务数据
- 需结合 msg 与 data 实际内容判断真实业务状态

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：api/gateway.js、api/httpInstance.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：949376aa-2a8f-4366-9f75-db6d23ef2d53；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "gateway_parse_fix",
  "source_extraction_id": "19ec049c4e274a508f21594b339261a7",
  "version": 1,
  "memory_type": "entities"
}
-->