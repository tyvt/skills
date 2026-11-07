
- 前端源码中不硬编码地图 API Key，统一通过带缓存的加载模块从系统参数配置读取，便于统一配置与维护。
- 地图 Key 走安全代理（如腾讯地图 GL 安全代理 serviceHost + WebService 代理），避免 Key 出现在前端页面与请求中。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "map_key_config",
  "source_extraction_id": "bb93ea9699ca4817a079efa9c53c61a4",
  "version": 2,
  "memory_type": "preferences"
}
-->