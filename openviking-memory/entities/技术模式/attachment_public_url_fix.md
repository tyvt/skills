# 附件预览下载不拼接API前缀修复
苏住房G项目zhi2-web-admin的detail-template附件预览与下载改用resolvePublicAssetUrl，不再拼接VITE_APP_BASE_API。

## 问题根因
- 附件展示、预览、下载原走getAttachmentFullUrl→resolveServerAssetUrl，会把相对路径拼在VITE_APP_BASE_API（文档中为/api/v2.0）后面。
- 文件服务若不在该前缀下，预览和下载就会出错。

## 修改内容
- src/utils/resolveServerAssetUrl.js 新增 resolvePublicAssetUrl：逻辑与resolveServerAssetUrl一致，但不再拼接VITE_APP_BASE_API。
- 相对路径以站点根为准（/xxx或无前导斜杠时补成/xxx），绝对地址、blob:、data:仍原样返回。
- detail-template.vue 的 getAttachmentFullUrl 改为使用 resolvePublicAssetUrl（附件缩略图、图片预览、fetch下载、window.open PDF与降级<a download>均走新规则）。
- type==='images' 的 :src 与 previewImages 里传给预览器的地址也统一用 getAttachmentFullUrl。

## 验证与归属
- 涉及文件：src/utils/resolveServerAssetUrl.js、src/components/detail-template/detail-template.vue
- 所属项目：苏住房G；来源会话：7046dcee-0d87-4ca0-b8dd-e8ee2a7597a2
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachment_public_url_fix",
  "source_extraction_id": "c9abe6077036411c8acf95c2da863d62",
  "version": 1,
  "memory_type": "entities"
}
-->