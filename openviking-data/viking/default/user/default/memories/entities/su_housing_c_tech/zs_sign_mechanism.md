# zs-sign业务签名机制
苏住房C(zhi2-mobile-shimin)恢复了`zs-sign`业务签名，网关头通过`getSignHeader`计算并写入。

## 机制说明
- `buildGatewayHeader`调用`getSignHeader(params)`计算签名并写入header的`zs-sign`字段
- 其余平台字段`zs-authorization`、`zs-param`、`zs-path`保持不变
- 签名依赖页面加载的`crypto-js`（见`index.html`），H5环境下正常生成
- 若`CryptoJS`未就绪，`zs-sign`回退为空字符串

## 涉及文件
- `index.html`
- `src/api/dispatcher.js`
- `src/api/httpInstance.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：864297ed-48fa-4d9e-92f6-8c3ade1e6bca
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_sign_mechanism",
  "source_extraction_id": "1dc4c2f4b8f548ee871a78669e257e68",
  "version": 1,
  "memory_type": "entities"
}
-->