# 文件预览微信小程序invalid url修复
苏住房C小程序 contracts.vue 调用 filePreview 因错误替换协议头导致 downloadFile 报 invalid url，已修复。

## 问题根因
- contracts.vue 通过 FileList → Type2.vue 调用 filePreview，后端返回相对路径。
- 原拼接逻辑 transferUrl = `${BASE_URL}${url}`.replace(/\/\//g, "/") 会把 https:// 中的 // 也替换，变成 https:/szf... 无效地址。

## 修复内容
- 统一使用项目已有 resolveMediaUrl，按路径前缀正确拼接 IMAGE_BASE / IMAGE_BASE_V1 域名，且不破坏协议头。

## 验证与归属
- 涉及文件：contracts.vue、Type2.vue、utils/index.js。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：114830fb-d6f5-4964-849d-72fac1151285。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "filepreview_url_fix",
  "source_extraction_id": "40d24fb84e4e48ed912d6d0221c023e2",
  "version": 1,
  "memory_type": "entities"
}
-->