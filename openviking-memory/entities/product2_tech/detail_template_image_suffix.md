# DetailTemplate type:image 后缀不匹配导致无扩展名图片无法显示
DetailTemplate 的 type:'image' 仅在后缀匹配 jpg/jpeg/png/gif/bmp/webp/svg 时才渲染 <img>；无扩展名的内部地址被误判为附件链接，从而无法显示。

## 根因
- 原始逻辑通过文件后缀白名单（jpg/jpeg/png/gif/bmp/webp/svg）来决定渲染 <img> 还是附件链接
- 无扩展名的内部资源地址不匹配任何后缀，被当作附件链接处理，导致图片无法显示

## 解决方案
- 将类型从 type:'image' 改为 type:'images'
- 添加计算属性 stepPictureUrlList 以提供 URL 数组
- 让 resolveServerAssetUrl 直接拼接 <img> 用于显示，不再依赖后缀匹配

## 验证与归因
- 验证：session 321b7eb6 结论，src=产品2.0/057.md
- 涉及文件：zhi2-web-admin/src/views/dataProperty/scrappedRecord/detail.vue、src/mixins/detailMixins.js、src/views/maintenance/facility/components/FacilitySelectDialog.vue、src/mixins/form.js、src/views/dataProperty/recordProcess/components/detail.vue、src/views/property/complexDeliveryApply/components/facilityDialog.vue、src/views/maintenance/repair/detail.vue、src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue
- 项目：产品2.0；source session: 321b7eb6-d1b4-4f6b-865c-11661215d619；code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "detail_template_image_suffix",
  "source_extraction_id": "2618dad3089247029330eb677f274518",
  "version": 1,
  "memory_type": "entities"
}
-->