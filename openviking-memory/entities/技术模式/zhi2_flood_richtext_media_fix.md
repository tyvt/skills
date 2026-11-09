# 苏住房防汛C端门户富文本媒体路径修复
门户H5富文本详情页图片相对路径补全完整域名的修复方案与验证记录。

## 问题根因
- 门户H5富文本详情页正文空白，接口正文图片为文件服务相对路径 `/zhi2-pro/...`
- 站点未反代 `/zhi2-pro`，rich-text 直接渲染相对路径导致请求 404、整块空白
- 正确文件服务域名为 `https://szfweb.szzfcjj.cn:8887`，该域名下返回 200 image/png

## 修复内容
- 新增 `src/utils/richText.ts`：`formatRichTextContent` 补全媒体相对路径为完整 URL（域名走 `VITE_MEDIA_BASE_URL`，默认 `https://szfweb.szzfcjj.cn:8887`，显式置空则保留相对路径）
- 同文件解码 HTML 实体、转义非法尖括号、给 `<img>` 加内联 `max-width:100%;height:auto`（scoped CSS 作用不到 rich-text 内部节点）
- `src/utils/portalData.ts`：`fetchDetail` 对正文统一格式化（兼容 `{content/configValue}` 对象）；`resolveMedia` 保留文件服务相对路径
- `.env.example` 补充 `VITE_MEDIA_BASE_URL` 说明；新增 8 个 richText 单测 + 1 个详情页 E2E 回归

## 验证与交付
- 单测 32/32 通过；新增文件无类型错误（仅剩基线存量 `InspectionType` 导出问题，与本任务无关）
- 详情页 E2E 通过：标题「台风避险指南！」、10 张图片全部渲染、`src` 均为 `https://szfweb.szzfcjj.cn:8887/zhi2-pro/...`、无 404 相对路径请求
- worktree `苏住房防汛C端-wt-richtext`、分支 `fix/portal-richtext-media`、commit `f7863a7`、`--no-ff` 合并 dev（合并 `d28e0be`）、推送 `e95adac..d28e0be`（2026-11-09）
- 本地验证用 nginx 临时切 root 至 worktree dist、反代指向 test 网关（仅本地配置不入库），验证后已还原为 dev 网关原状

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_flood_richtext_media_fix",
  "source_extraction_id": "cac61d0082db4e9fae5e164fd247fbbe",
  "version": 1,
  "memory_type": "entities"
}
-->