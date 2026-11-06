# 本地字典regionOptions重命名修复
苏州市房地产监测V3 将本地字典数据从 `regionOptions` 重命名为 `administrativeAreaOptions`，避免与 `detailMixins` 的 `area` mixin 中 computed `regionOptions` 冲突。

## 修改文件
- `companyRecordAgency/change/detail.vue`（`AgencyRecordChangeDetail`）：模板、data、initDict 三处改为 `administrativeAreaOptions`
- `toB/companyRecord/detail.vue`：同样三处重命名（含 `catch` 分支）
- 子组件 `CompanyBasicInfoForm` 对应引用同步

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：8173eb01-8b73-474d-a30a-4662d6fb521e
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_options_rename",
  "source_extraction_id": "2fc661addc014e93b50dd3ca11d84086",
  "version": 1,
  "memory_type": "entities"
}
-->