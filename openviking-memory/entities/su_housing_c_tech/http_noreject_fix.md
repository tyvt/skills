# 房源核验网络错误提示修复
苏住房C小程序二手房房源发布校验时接口成功但页面误报"网络错误，请稍后再试"，已修复 HTTP 拦截器配置。

## 问题根因
- 接口外层 code: 200 表示成功，但业务层 code: 500（message: "核验失败..."）表示核验失败
- secondVerifyLogVerify 配置了 noReject: true，希望由页面自行处理业务错误
- v1Instance.js 未开启 supportNoReject: true，导致 noReject 配置未生效
- 拦截器把 code: 500 当成请求失败，且内层响应用 message 而非 msg，最终 fallback 成通用提示
- verification.vue 已写好 code == 500 跳转核验失败页的逻辑，但从未被执行到

## 修复内容
- v1Instance.js 补充 supportNoReject: true（与 V2 的 api/index.js 保持一致）
- 使 noReject: true 生效，页面可拿到业务错误并自行跳转核验失败页展示具体原因

## 涉及文件与归属
- 涉及文件：src/api/httpInstance.js（v1Instance.js）、verification.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：df98a5b7-7af2-4775-8bc5-f19612418dfd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "http_noreject_fix",
  "source_extraction_id": "0842d2bc9d344262a3fdeea27c8b4603",
  "version": 1,
  "memory_type": "entities"
}
-->