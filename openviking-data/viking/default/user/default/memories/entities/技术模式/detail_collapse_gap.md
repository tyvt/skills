# 表单折叠块垂直间距问题
带 Collapse 块的表单缺少垂直间距，与只读布局不一致。

## 根因
- 表单组件中的 `.detail-from-container` 包含多个 Headline（`.collapse-container`）但缺少垂直间距。

## 解决方案
- 在 `zhi2-web-admin/src/styles/index.scss` 中为 `.developer-basic-info-form` 和 `.agency-basic-info-form` 添加 `display: flex; flex-direction: column; row-gap: var(--detail-block-gap)`（12px），使 `Headline`（`.collapse-container`）垂直间距对齐只读页布局。

## 涉及文件
- `detail.vue`、`detail-form.scss`、`index.scss`、`DeveloperBasicInfoForm.vue`、`Headline/index.vue`、`detail-form-el-row-spot-check.md`、`staffManagement/components/detail.vue`、`DeveloperBasicInfoDetail.vue`（位于 苏州市房地产监测V3 项目）

## 验证
- 证据：src=苏州市房地产监测V3/220.md 与 src=苏州市房地产监测V3-leftover/020.md；会话 479fbf59-8cc1-4660-b5b4-7e972253abe9；代码基线 none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：479fbf59-8cc1-4660-b5b4-7e972253abe9


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_collapse_gap",
  "source_extraction_id": "d743391f84c8405d8d72212526994dae",
  "version": 3,
  "memory_type": "entities"
}
-->
