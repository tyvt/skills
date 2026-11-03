# H5端GET query单键编码致业务参数错位
苏住房C H5 端 serializeQueryParams 对单 key/value 编码后整体 base64，致服务端拿到百分号串而非明文中文。

## 问题现象
- 苏住房 H5(zhi2-mobile-admin-h5-c-unlimited/szffluzm) 请求参数先 base64 化，中文值「银行」变 %E9%93%B6%E8%A1%8C 百分号串
- 用户要求「还原成旧的方式」，base64 解码后应是明文中文而非编码串

## 根因
- serializeQueryParams 对每个 key/value 单独 encodeURIComponent 后再整体 encodeURIComponent+Base64
- 传输层编码泄漏进业务参数层，服务端拿编码串使排序、签名、关键字回显错位

## 解决方案
- serializeQueryParams 只做明文拼接(keyWord=花园)，不对单个 key/value 编码
- 拼接结果统一交 encodeZsParam 做「整体 encodeURIComponent+Base64」，保证解码即明文
- 校验口径：keyWord=花园→整体编码 a2V5V29yZD3oirHlm60=→解码回 keyWord=花园
- 改完重新构建部署 szffluzm，小程序端 v1Instance/gateway 等同源封装一起核对

## 验证与归属
- 验证会话 94754f00：用户先提单键编码再整体 base64，对照破坏业务参数后要求还原旧方式，最终 serializeQueryParams 只整体编码
- 涉及文件：src/utils/h5Context.js、src/api/gateway.js、src/api/index.js、src/api/v1Instance.js、szffluzm/index.html
- 所属项目：苏住房C；来源会话ID：94754f00-83ea-4599-aff3-ea29d1188891；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_query_encode",
  "source_extraction_id": "c44346873fb44f028707ec585c087aa1",
  "version": 1,
  "memory_type": "entities"
}
-->