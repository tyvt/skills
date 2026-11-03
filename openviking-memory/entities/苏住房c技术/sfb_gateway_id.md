# 苏服办网关GET/POST靠不同interface_id分流
苏住房C（zhi2-mobile-shimin）所有接口经苏服办网关gateway.do转发，GET/POST须用不同interface_id，且普通请求不要自带zs-method。

## 网关机制
- 网关对外只有POST一个HTTP入口，业务方法由interface_id+zs-path两字段表达，非由请求头zs-method表达

## 解决方案
- GET用interface_id szffluzm-yhcq，POST仍用szffluzm-whyhxx
- .env.production/.env.test删掉VITE_APP_SFB_GET_VIA_POST_INTERFACE开关（.env.development本未开无需改）
- dispatcher.js里普通GET/POST不再自动附加zs-method，header只保留zs-sign/zs-authorization/zs-param/zs-path四项
- PUT/DELETE等仍可用zs-method指定

## 排查排序
- 若仍404先确认出口IP是否已加入苏服办白名单，签名逻辑此前已验证无误不要重复怀疑
- 验证：会话c478c634（2026-07-01，基线a444c05）用户要求「原来是get就用上架的get接口请求」，最终列出interface_id与移除开关、dispatcher不再带zs-method；涉及文件src/api/dispatcher.js、src/api/httpInstance.js、src/utils/sign.js、.env.production、.env.test、vite.config.ts；所属项目苏住房C；来源会话ID c478c634-ab88-4869-acb4-0397beaaa2f4；代码基线a444c05

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_gateway_id",
  "source_extraction_id": "0e31f6bb15d24732a33d1e0cad0d9ed7",
  "version": 1,
  "memory_type": "entities"
}
-->