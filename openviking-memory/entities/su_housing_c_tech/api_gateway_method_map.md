# API网关方法映射
苏住房C所有请求均通过`createHttpClient`（`api`/`apiV1`）发出，传输层在调用时确定网关方法。

## 调用映射规则
- `api.get` → backendMethod GET，gatewayInterfaceMethod GET，interface_id `szffluzm-yhcq`
- `api.post` → backendMethod POST，gatewayInterfaceMethod POST，interface_id `szffluzm-whyhxx`
- `api.put` → backendMethod PUT，gatewayInterfaceMethod POST，interface_id `szffluzm-whyhxx`
- `api.post` + `zs-method: put/delete` → POST/POST，interface_id `szffluzm-whyhxx`
- `api.file` → POST（isFileUpload优先），gatewayInterfaceMethod POST

## 核对结论
- 全项目无绕过网关的直接axios或uni.request调用
- 传输层判断逻辑已加固，确保接口方法正确

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：property.js、autonomy.js、chat.js、msg.js、transaction.js、bindProject.vue、deviceInfo/bind.vue、file.js、articleV1.js
- 来源会话ID：3863efc7-4edd-492d-93be-201508d84835；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "api_gateway_method_map",
  "source_extraction_id": "0632a595a1fc4cbdb2148019d9ed92c3",
  "version": 1,
  "memory_type": "entities"
}
-->