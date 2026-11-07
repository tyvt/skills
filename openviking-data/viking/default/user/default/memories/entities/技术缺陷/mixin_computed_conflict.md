# data与mixin计算属性同名触发Vue警告
`AgencyBasicInfoDetail` 混入 `area` mixin 的 computed `regionOptions` 与组件 `data` 中同名 `regionOptions`（加载 `ECONOMIC_INSTITUTIONS_REGION` 字典）冲突触发 Vue 警告。
## 问题根因
- `area` mixin 的 computed `regionOptions` 与 `AgencyBasicInfoDetail` 组件 `data` 中同名 `regionOptions`（加载 `ECONOMIC_INSTITUTIONS_REGION` 字典）冲突
- 触发 Vue 警告
## 解决方案
- 将组件 `data` 字段重命名为 `administrativeRegionOptions`
- 同步更新 `loadDicts` 配置与 `basicInfo` 计算属性传参 `regionOptions: this.administrativeRegionOptions`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/319.md
- 涉及文件：company/companyManagement/components/AgencyBasicInfoDetail.vue、mixins/detailMixins.js、mixins/area.js、company/companyManagement/components/DeveloperBasicInfoDetail.vue、company/companyRecordAgency/detail.vue、company/companyManagement/components/agencyBasicInfoContent.js
- 所属项目：苏州市房地产监测V3；来源会话：3dd2b09c-ad3e-42a8-b87c-2fba58a2576a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "mixin_computed_conflict",
  "source_extraction_id": "969c384fc80b418cbab762ab5162a5c9",
  "version": 1,
  "memory_type": "entities"
}
-->