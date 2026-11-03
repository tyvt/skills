# 分支页附件预览报错与保存校验修复
苏州市房地产监测V3 中分支页附件预览因字典匹配错误报错且保存未校验必传附件，已修复。

## 问题根因
- `ImageGrid.vue` 中 `file_type` 字典未匹配使 `elem` 为 `undefined` 并报错，导致缩略图与预览失效
- `AgencyBranchDetail` 保存仅校验表单而未查必传附件

## 修复方案
- `ImageGrid.vue` 以 `dictValue === '0'` 判图片，缩略图取 `fileThumbnailSite`、预览取 `fileSite`，修正索引
- `FileList.vue` 预览按钮兼容大小写并扩展 gif/webp/bmp
- 新增 `src/utils/appendix.js` 的 `checkRequiredAppendix`，在 `handleSave` 与 `CancelDialog` 注销前调用校验

## 涉及文件
- `AnnexUpload/index.vue`
- `AgencyBranchDetail.vue`
- `ImageGrid.vue`
- `AgencyPersonnelDetail.vue`
- `AgencyBranchList.vue`
- `resolveServerAssetUrl.js`
- `FileList.vue`
- `AgencyPersonnelList.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/162.md
- 来源会话ID：7dc2bf6f-2c30-4f16-b810-f728fa38f9d8
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_appendix_fix",
  "source_extraction_id": "35936e6489bd44a1be5cd1e65794bc05",
  "version": 1,
  "memory_type": "entities"
}
-->