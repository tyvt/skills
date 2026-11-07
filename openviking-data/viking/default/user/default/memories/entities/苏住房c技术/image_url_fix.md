# 图片地址内网IP无法显示修复
苏住房C(zhi2-mobile-shimin)小程序中因接口返回带内网IP的完整URL，原resolveMediaUrl原样返回导致苏服办H5无法访问图片。

## 问题根因
- 接口/菜单配置里很多图片是带内网IP的完整URL，如`http://218.4.168.198:8887/zhi2-pro/xxx.png`
- 原`resolveMediaUrl`看到`http://`开头原样返回，不会改成线上地址
- 苏服办H5无法访问`218.4.168.198`，图片加载失败；正确地址应为`https://szfweb.szzfcjj.cn:8887/zhi2-pro/xxx.png`

## 修复方案
- 更新`src/utils/index.js`的`resolveMediaUrl`
- 识别`/zhi2-pro`、`/zhi2-dev`、`/zhi2-test`、`/zs-fym`等资源路径
- 从任意域名完整URL中提取路径，生产环境拼接`VITE_APP_API_PROXY`（`https://szfweb.szzfcjj.cn:8887`）
- 外部图片（如`https://szjjy1.com/...`）保持不变

## 涉及文件与归属
- 文件：`src/utils/index.js`、`src/components/ZsImage/ZsImage.vue`
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：2e8372a6-9098-488b-857d-9bb7ec7f209a；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "image_url_fix",
  "source_extraction_id": "bf9a9e6490474d3899e2f109c73f11cf",
  "version": 1,
  "memory_type": "entities"
}
-->