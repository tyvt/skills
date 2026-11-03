# processPictureList未拼域名H5加载失败
泰兴小程序 `processPictureList` 返回 `/zhi2/...` 相对路径直接传 `ImageGrid` 致 H5 图片加载失败，需按平台拼接完整 URL。

## 问题根因
- `processPictureList` 返回 `/zhi2/...` 相对路径直接传 `ImageGrid`。
- 致 H5 图片加载失败。

## 解决方案
- `maintain-detail.vue` 参照 `daily.vue` 按平台拼接 `VITE_APP_API_BASE_URL` 或 `IMAGE_BASE` 为完整 URL 后传入。

## 验证与归属
- 验证证据：src=泰兴小程序/022.md
- 涉及文件：d:/repository/泰兴小程序/src/pages_facility/maintain-detail.vue、d:/repository/泰兴小程序/src/pages_facility/record-detail.vue、d:/repository/泰兴小程序/src/components/ImageGrid/ImageGrid.vue、d:/repository/泰兴小程序/src/components/ZsImage/ZsImage.vue、d:/repository/泰兴小程序/src/pages_owner/repair/detail.vue、d:/repository/泰兴小程序/src/pages_property/rcService/daily.vue、d:/repository/泰兴小程序/src/pages_facility/detail.vue、d:/repository/泰兴小程序/src/pages_property/rcService/components/ServiceItem.vue
- 来源会话ID：5e4b840b-e829-4269-ac04-0e7b59b6a428
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "process_picture_domain",
  "source_extraction_id": "5fe64a913e8e4332b1aa5926a136ded7",
  "version": 1,
  "memory_type": "entities"
}
-->