# 图片地址按资源路径段重写生产域名
苏住房C的zhi2-mobile-shimin打包部署到苏服办H5后，配置里带内网IP的绝对URL须按资源路径段重写到生产域名。

## 问题现象
- 部署苏服办H5后大量图片不显示，接口和菜单配置里很多图片是带内网IP的完整URL（如 `http://218.4.168.198:8887/zhi2-pro/xxx.png`）。

## 根因
- 公共方法 `resolveMediaUrl` 原逻辑「以 http:// 开头就原样返回」，把内网绝对地址当外网直链；苏服办H5访问不到内网 218.4.168.198，全部404。

## 解决方案
- 不再按是否绝对URL分流，改为按资源路径段识别：命中 `/zhi2-pro`、`/zhi2-dev`、`/zhi2-test`、`/zs-fym` 等已知前缀时，先从完整URL提取pathname，再在生产环境拼 `VITE_APP_API_PROXY`（https://szfweb.szzfcjj.cn:8887）。
- 真正外部图片（如 https://szjjy1.com/banner1.png）不含这些前缀，保持原样。
- 以后新增资源目录（新前缀）必须同步加入 `resolveMediaUrl` 识别清单，否则新目录下图片在H5静默404。
- 排查此类问题直接在 vConsole 看图片实际请求URL再对表，不靠肉眼比对源码。

## 验证与归属
- 验证：会话 2e8372a6 用户反馈图片地址还是没法显示，定位 resolveMediaUrl 旧逻辑直返http地址、H5无法访问218.4.168.198，改为识别资源前缀提取路径拼代理域名后修复。
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、.env.production、.env.development
- 所属项目：苏住房C；来源会话ID：2e8372a6-9098-488b-857d-9bb7ec7f209a；代码基线：a444c05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resolve_media_url",
  "source_extraction_id": "fb3a64033c064976b834d788539c9914",
  "version": 1,
  "memory_type": "entities"
}
-->