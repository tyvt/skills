# 苏住房C接口传输层方法映射
苏住房C小程序所有请求均经createHttpClient（api/apiV1）发出，其传输层在调用时即确定后端方法与网关接口方法。

## 调用方式映射
- `api.get` → backendMethod=GET，gatewayInterfaceMethod=GET，interface_id=`szffluzm-yhcq`
- `api.post` → backendMethod=POST，gatewayInterfaceMethod=POST，interface_id=`szffluzm-whyhxx`
- `api.put` → backendMethod=PUT，gatewayInterfaceMethod=POST，interface_id=`szffluzm-whyhxx`
- `api.post` + `zs-method: put/delete` → backendMethod=POST，gatewayInterfaceMethod=POST，interface_id=`szffluzm-whyhxx`
- `api.file` → backendMethod=POST，gatewayInterfaceMethod=POST（isFileUpload优先）

## 约束与验证
- 全项目无绕过网关的直接axios或uni.request调用
- 涉及文件：property.js、autonomy.js、chat.js、msg.js、transaction.js、bindProject.vue、deviceInfo/bind.vue、file.js、articleV1.js
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：3863efc7-4edd-492d-93be-201508d84835

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "http_client_method_mapping",
  "source_extraction_id": "30a2036c9e1f47b7b6a75df36df72229",
  "version": 1,
  "memory_type": "entities"
}
-->