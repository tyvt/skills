# 苏服办H5图片不显示统一resolveMediaUrl
zhi2-mobile-shimin 上架苏服办 H5 轻应用后相对路径图片全挂，根因是运行环境无反向代理层。

## 根因
- 开发态靠 Vite 反向代理转相对路径到后端，上架环境不允许配置反代，相对路径解析到轻应用静态域必然 404
- 不是组件问题，改 ZsImage 或逐页排查无效

## 解决方案
- 新增 src/utils/index.js 的 resolveMediaUrl，仅生产环境拼绝对地址：普通资源拼 VITE_APP_API_PROXY，/zs-fym 开头走 VITE_APP_IMG_PROXY_V1，http(s):// 与 /static/ 原样返回
- 开发环境保持相对路径不动
- 必须收敛所有图片来源：ZsImage、MenuImage、HotAppsHome、首页轮播与资讯图、swiperComponent/swiperImage、ZsUploader、附件缩略图、视频详情页等 12 处消费点

## 验证与归属
- 所属项目：苏住房C；来源会话：2f17a9af-1ba3-4667-86fa-d55215ed0873；代码基线：a444c05
- 涉及文件：src/utils/index.js、ZsImage.vue、MenuImage.vue、HotAppsHome.vue、Home_Suzhufang.vue、swiperComponent.vue、swiperImage.vue、.env.production

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "resolve_media_url",
  "source_extraction_id": "3b9e083f125d45f880ff8ff4eadaf2e5",
  "version": 1,
  "memory_type": "entities"
}
-->