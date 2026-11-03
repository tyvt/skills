# 要件宫格上传改为图片卡片式
苏州市房地产监测V3 中将要件宫格（requirement-grid）可编辑上传改为 el-upload 的 picture-card 样式，并移除标题栏「文件上传」按钮。

## 变更要点
- 要件宫格可编辑上传改为 `el-upload` 的 `list-type="picture-card"`
- 移除标题栏「文件上传」按钮
- `AppendixRequirementCard.vue` 使用 `--appendix-thumb-size` 对齐

## 关联改动
- `AnnexUpload` 与 `AppendixRequirementGrid` 新增 `removeAppendixFile`
- `getList` 返回 `Promise` 防止回弹
- `EntrustSaleAddAppendix.vue` 同步接入 `:on-remove-file`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/181.md
- 涉及文件：Headline/index.vue、DetailAppendixPanel/index.vue、DeveloperBasicInfoDetail.vue、permit/detail.vue、AppendixPackageSection/index.vue、AppendixRequirementCard.vue、AppendixRequirementGrid.vue、AppendixFileThumbnail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：d645224e-9b5c-4725-8923-04a22668da18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_grid_picture_card",
  "source_extraction_id": "d2f3bc9cdf3c4c72be8ab951414c7c0b",
  "version": 2,
  "memory_type": "entities"
}
-->