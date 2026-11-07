# 腾讯地图组件Logo点击跳转约束
ZsMap.vue使用uni-app原生<map>组件（底层腾讯地图），其左下角Logo/版权文字点击会跳转，官方无禁用配置项。

## 问题说明
- ZsMap.vue通过uni-app原生<map>组件渲染，底层为腾讯地图
- 左下角"腾讯地图"Logo/版权文字点击会跳转至腾讯地图
- 官方未提供"禁用点击"的配置项

## 约束与建议
- 腾讯地图服务协议要求保留Logo，不建议用CSS隐藏
- 若仅为避免用户误点跳转，需采用其它非隐藏方案

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/components/ZsMap/ZsMap.vue、src/pages_owner/project/info/index.vue
- 来源会话：8caf0d1f-dcbc-42e1-947f-e60d56e58eef
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zsmap_logo_click",
  "source_extraction_id": "b152b5befc5a42e3af934b208fbec5c4",
  "version": 1,
  "memory_type": "entities"
}
-->