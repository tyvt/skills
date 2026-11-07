# ZsImage图片地址统一走resolveMediaUrl
苏住房C 小程序中 ZsImage 手动拼 IMAGE_BASE 会拼出 /ttp:// 非法串导致 500，需统一走 resolveMediaUrl 处理 src。

## 问题现象
- 微信小程序渲染层报 Failed to load local image resource /ttp://218.4.168.198:8887/zhi2-pro/...png，status 500
- 开头 /ttp 少一个 h，是被当相对路径截错的标志

## 根因
- 接口可能直接返回完整内网地址 http://...，ZsImage 在小程序端无条件执行 `${IMAGE_BASE}${props.src}` 拼出非法 URL
- utils 的 resolveMediaUrl 在小程序端原本只返回相对路径未拼 IMAGE_BASE，<image> 同样加载不出

## 解决方案
- 地址拼接收敛到唯一出口 resolveMediaUrl，ZsImage 一律通过它处理 src，禁止组件内手写 IMAGE_BASE + src
- resolveMediaUrl 需：小程序端拼完整 HTTPS；已带 http(s):// 绝对地址原样透传；兼容 /http:// 误加前导斜杠（先剥斜杠再判前缀）
- 排查顺序：打印最终 src 看是否重复拼接 → 查微信后台 downloadFile 合法域名 → 确认服务器文件真实存在

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 d56ce156（基线 9832ba3）报错 /ttp://... 500；接口返完整内网地址，ZsImage 拼出非法 URL；修复 utils/index.js 的 resolveMediaUrl 拼 IMAGE_BASE 并兼容 /http://，ZsImage 改调用
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue、src/env/mp.js、vite.config.ts、src/page-query/components/PropertyCard.vue、src/pages/index/components/menu/MenuImage.vue
- 所属项目：苏住房C；来源会话ID：d56ce156-0a63-4298-b177-fd3d0430fcf2；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsimage_media_url",
  "source_extraction_id": "cb687cdf13e34fa6a1124eadb650c4e7",
  "version": 1,
  "memory_type": "entities"
}
-->