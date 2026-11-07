# 要件上传必填星号可见性缺陷
AppendixRequirementCard.vue 未依据 operable 控制必填星号，致详情查看页错误显示红色 *，新增 showRequiredMark 计算属性修复。

## 现象与根因
- `AppendixRequirementCard.vue` 未依据 `operable` 控制必填星号，详情查看页（operable=false）错误显示红色 *。
- 原有校验逻辑 `checkRequiredAppendix` 未变动。

## 修复要点
- 新增计算属性 `showRequiredMark` 限定 `operable === true` 且 `isRequired === '1'` 时显示星号。
- `AppendixPackageSection` 与 `AnnexUpload` 分别传入 `false`/`true` 控制显隐。

## 涉及文件与验证
- 涉及：AppendixRequirementCard.vue、AppendixRequirementGrid.vue、toB/companyRecord/detail.vue、AnnexUpload/index.vue、DeveloperBasicInfoDetail.vue、AppendixPackageSection/index.vue、AgencyBranchDetail.vue、e2e/utils/appendix-requirement-grid.spec.js。
- 验证：src=苏州市房地产监测V3/245.md；来源会话：b4676408-39dd-4ce7-bd44-3126514f23d0。

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_required_mark_visibility",
  "source_extraction_id": "16d52690aaa041be8ea47d27cdf763c1",
  "version": 1,
  "memory_type": "entities"
}
-->
