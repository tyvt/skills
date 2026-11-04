# 内网IP图片URL未转线上致H5失败
苏住房C「苏找房」H5接口返回带内网IP的完整图片URL，原样返回致H5无法访问，需在生产环境拼接线上代理域名。

## 问题现象
- 接口返回带内网IP完整URL（如 http://218.4.168.198:8887/zhi2-pro/xxx.png），resolveMediaUrl 原样返回
- H5 页面无法访问该内网地址，图片加载失败

## 根因
- resolveMediaUrl 未对内网IP地址做转换，直接返回原始URL
- 外部图片与内网图片未区分处理

## 解决方案
- 在 src/utils/index.js 提取 /zhi2-pro 等路径，生产环境拼接 VITE_APP_API_PROXY（https://szfweb.szzfcjj.cn:8887）
- 外部图片保持不变，仅转换内网路径

## 验证与归属
- 验证：会话 2e8372a6 用户反馈H5图片失败，提取路径拼接代理域名后修复
- 涉及文件：src/components/ZsImage/ZsImage.vue、src/utils/index.js、src/vite.config.ts、src/api/httpInstance.js、src/pages/index/components/menu/MenuImage.vue、src/pages/commonNew/swiperImage.vue、src/components/ImageUploader/ImageUploader.vue、src/pages/index/components/Home_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：2e8372a6-9098-488b-857d-9bb7ec7f209a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "ip_image_url_h5_bug",
  "source_extraction_id": "395f446932c540848feb870a30c2925f",
  "version": 1,
  "memory_type": "entities"
}
-->