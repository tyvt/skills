# 业主端图片图标因 ZsImage 兜底图双重拼接缺失
调整分包后业主端大量图片与 icon 不显示，根因是 ZsImage 兜底逻辑把完整远程 URL 拼进本地 static 前缀。

## 问题根因
- 报错 URL `__pageframe__/static/https://www.ylzhwy.com:8081/...` 暴露完整远程 URL 被运行时拼进本地 `static/` 前缀
- `ZsImage` 组件的 `buildStaticUrl`（负责给本地路径拼 `static/` 前缀）不判断 http 开头
- 从 2026-09-01 提交起，8 处 `fallBackSrc`（我的页默认头像、首页 news 封面 no_img、ImageGrid、选举/决策系列）被改成完整远程 URL，兜底时拼成 `static/https://...` 必然加载失败
- `OptionResult.vue` 的 fallback 还指向已被删除的本地 png
- 2026-09-09 版本因测试数据有图未触发 fallback 而潜伏，当前测试数据无图集中暴露；bug 自 9/1 起就在，非版本回退

## 验证与归属
- 验证证据：extracted source=workbuddy project=泰兴小程序
- 涉及文件：src/components/ZsImage/ZsImage.vue、src/pages_owner/decision/components/multiple/OptionResult.vue、src/pages.json、vite.config.ts、scripts/findUnUseImages.mjs
- 来源会话ID：9e999a07-f853-49b6-96db-57e8f64f3141

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsimage_fallback_splice",
  "source_extraction_id": "31154dd57d29449692bc02b09f1c6aad",
  "version": 1,
  "memory_type": "entities"
}
-->