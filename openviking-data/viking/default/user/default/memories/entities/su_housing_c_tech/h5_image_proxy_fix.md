# 苏服办H5图片地址拼接修复
苏住房C 修复上架苏服办无反向代理时网络图片不显示问题，新增统一 resolveMediaUrl。

## 方案说明
- 开发环境走 Vite 反向代理，相对路径不变
- 生产环境自动拼接：普通资源 https://szfweb.szzfcjj.cn:8887+路径；/zs-fym 开头用 VITE_APP_IMG_PROXY_V1+路径；已有 http(s):// 或 /static/ 不处理

## 主要改动
- src/utils/index.js 新增 resolveMediaUrl，filePreview 同步使用
- src/components/ZsImage/ZsImage.vue 服务端图片统一走 resolveMediaUrl
- src/pages/index/components/menu/MenuImage.vue、HotAppsHome.vue 菜单/热点应用图标统一处理

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：2f17a9af-1ba3-4667-86fa-d55215ed0873

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "h5_image_proxy_fix",
  "source_extraction_id": "2d3f203c03d84e25a3c003479966ebf2",
  "version": 1,
  "memory_type": "entities"
}
-->