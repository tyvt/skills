# resolveMediaUrl对/zs-fym走独立图片域名致生产图片404
苏住房C小程序/H5 生产环境图片整块不显示，因 src/utils/index.js 的 resolveMediaUrl 对 /zs-fym 开头路径拼了错误的独立图片域名，未跟随 VITE_APP_API_PROXY。

## 问题现象
- 生产环境图片整块不显示，接口返回路径形如 /zs-fym/xxx/xxx.jpg
- 排查时浏览器 Network 看图片请求完整 URL 前缀即可定位是否拼错域名

## 根因
- resolveMediaUrl 对以 /zs-fym 开头的路径走单独分支，拼 VITE_APP_IMG_PROXY_V1（http://szfang.szfcweb.cn）
- 与 .env.production 的 VITE_APP_API_PROXY（https://szfweb.szzfcjj.cn:8887）不是同一台服务，请求落到错误域名

## 解决方案
- 去掉 /zs-fym 特殊分支，生产环境所有相对路径统一用 VITE_APP_API_PROXY 拼接
- vite.config.ts 里本地 dev 的 /zs-fym 代理也指向同一变量，保证 dev 与 prod 同源
- swiperImage.vue 补 :local="false"，避免 ZsImage 把服务器地址当本地静态资源
- 最终规则：/zs-fym/... 与 /zhi2-pro/file/... 都拼 API 代理；已是 https:// 的完整 URL 原样返回不重复拼接

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 bb5ef4f6 用户判断正确域名应为 VITE_APP_API_PROXY + 接口返回地址；确认 /zs-fym 分支拼到 VITE_APP_IMG_PROXY_V1，已改 utils/index.js、vite.config.ts、swiperImage.vue
- 涉及文件：src/utils/index.js、vite.config.ts、src/pages/commonNew/swiperImage.vue、.env.production、src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话ID：bb5ef4f6-787c-49c9-b071-0b62385878d7；代码基线：a444c05

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "media_url_domain_mismatch",
  "source_extraction_id": "f077e1fff63b403981d63766777c8762",
  "version": 1,
  "memory_type": "entities"
}
-->