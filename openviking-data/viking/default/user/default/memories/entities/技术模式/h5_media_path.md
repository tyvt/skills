# H5 子目录部署媒体路径被拼前缀
H5 端部署在子目录时，媒体相对路径会被拼进页面路径前缀，resolveMediaUrl 需统一补前导斜杠。

## 问题现象
- 访问服务器图片实际请求成 https://域名/testh5/pages/index/zhi2-pro/2025/...，预期是 https://域名/zhi2-pro/2025/...
- 图片全部 404/裂图

## 问题根因
- 部署在 /testh5/pages/index/ 子目录时，utils/index.js 的 resolveMediaUrl 对媒体路径（zhi2-pro、zhi2-dev、zhi2-test、zs-fym 等）返回不带前导 / 的相对路径
- 浏览器按当前页面路径解析相对 URL，把站点子目录前缀一并拼进去
- 根路径部署的测试环境看不出问题，只在子目录部署暴露；易被误判为后端返回路径不对

## 解决方案
- 在 resolveMediaUrl 里对识别出的媒体资源目录统一补前导 /，强制从站点根解析
- 改动落在 utils 一处即可覆盖所有用 ZsImage（:local="false"）或直接调 resolveMediaUrl 的图片
- 新增媒体目录前缀时要同步加进白名单，否则新目录会复发同类问题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 288c6ff2 用户贴出实际访问地址，结论为 resolveMediaUrl 返回不带前导 / 的相对路径，修复是对媒体目录统一加前导 /
- 涉及文件：zhi2-mobile-shimin/src/utils/index.js、zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话：288c6ff2-ac59-4b55-b6ee-a561f76eeba1；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_media_path",
  "source_extraction_id": "0bb48399527b42a8b82c414ecfd73497",
  "version": 1,
  "memory_type": "entities"
}
-->