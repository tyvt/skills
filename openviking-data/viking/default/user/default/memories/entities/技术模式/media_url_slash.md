# H5 子目录部署媒体相对路径被拼前缀
苏住房C 的 zhi2-mobile-shimin 在 H5 子目录部署时，resolveMediaUrl 返回不带前导斜杠的相对路径，浏览器按当前页面路径拼接致图片 404。

## 问题根因
- 部署在 /testh5/pages/index/ 子目录时，utils/index.js 的 resolveMediaUrl 对媒体路径（zhi2-pro、zhi2-dev、zhi2-test、zs-fym 等）返回不带前导 / 的相对路径
- 浏览器按当前页面路径解析相对 URL，把站点子目录前缀拼进去，实际请求成 .../testh5/pages/index/zhi2-pro/... 而非 .../zhi2-pro/...
- 易被误判为后端返回路径不对，实际是前端拼 URL 语义问题；根路径部署测试环境看不出，只在子目录部署暴露

## 解决方案
- 在 resolveMediaUrl 对识别出的媒体资源目录统一补前导 /，强制从站点根解析
- 改动落在 utils 一处即可覆盖所有用 ZsImage（:local="false"）或直接调 resolveMediaUrl 的图片
- 新增媒体目录前缀时同步加进白名单，否则新目录会复发同类问题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 288c6ff2，用户给出实际访问地址 .../testh5/pages/index/zhi2-pro/2025/...png 要求改回 .../zhi2-pro/...，结论为补前导 /
- 涉及文件：zhi2-mobile-shimin/src/utils/index.js、zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue
- 所属项目：苏住房C；来源会话：288c6ff2-ac59-4b55-b6ee-a561f76eeba1；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "media_url_slash",
  "source_extraction_id": "62d87249144d403883d1af7d2739cef7",
  "version": 1,
  "memory_type": "entities"
}
-->