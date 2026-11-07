# 苏服办请求头缺失修复
苏住房C 苏服办相关请求因平台层404，经日志分析前端组装正确，已增加 `zs-method` 头与环境变量。

## 日志分析
- `interface_id` 为 `szffluzm-yhcq` GET接口，路径、签名、Content-Type均正确
- 响应 `404 请求接口不存在` 为苏服办开放平台网关拒绝，非业务后端错误

## 修复要点
- `header` 增加 `zs-method: GET`，让后端走POST接口时识别真实HTTP方法
- 新增环境变量 `VITE_APP_SFB_GET_VIA_POST_INTERFACE = 1`（production/test已开启），GET改走 `szffluzm-whyhxx`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/utils/app.js`、`src/api/httpInstance.js`、`src/api/dispatcher.js`、`src/utils/sfb.js` 等
- 来源会话ID：fdcfee4e-6023-4d73-9f92-442adf4614ff
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "sfb_header_fix",
  "source_extraction_id": "5098ffda0d4344d19a85da69bcffd9f0",
  "version": 1,
  "memory_type": "entities"
}
-->