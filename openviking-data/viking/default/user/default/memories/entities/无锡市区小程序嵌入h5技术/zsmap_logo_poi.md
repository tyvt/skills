# uni-app ZsMap的Logo误点与enable-poi限制
ZsMap使用uni-app原生<map>（腾讯地图），需处理Logo误点跳转及H5上enable-poi限制。

## Logo误点拦截
- 左下角腾讯地图Logo/版权无官方禁用点击配置，协议要求保留，不宜CSS隐藏
- 防误点在map外包relative容器，左下角加绝对定位透明view（约120rpx×48rpx，z-index高于地图）拦截点击

## POI与展示限制
- 地图POI路名/商铺名可试:enable-poi="false"，但H5（含web-view）文档未保证生效
- 小区周边仅展示不要跳转时：project/info可关zoom/scroll，或改用腾讯静态图API/容器pointer-events:none（仅保留自定义marker）

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话8caf0d1f用户问腾讯地图文字可否禁用点击，结论区分Logo、POI、静态展示三场景并给map-logo-blocker示例与平台表
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/components/ZsMap/ZsMap.vue、src/pages_owner/project/info/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：8caf0d1f-dcbc-42e1-947f-e60d56e58eef；代码基线：afae6cd

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zsmap_logo_poi",
  "source_extraction_id": "15d4ef385e484d06ad824eb7386927bc",
  "version": 1,
  "memory_type": "entities"
}
-->