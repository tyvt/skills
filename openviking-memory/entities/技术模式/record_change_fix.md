# 机构入网详情「变更」接口扩展
苏州市房地产监测V3 项目 zhi2-web-admin 中机构入网详情「变更」接口已扩展，支持传入 companyRecordId。

## 修改内容
- `companyRecord.js` 的 `getLastChangeByLogin` 现支持可选 `data` 与 `config` 参数，企业端无参调用保持兼容
- `companyRecordAgency/detail.vue` 的 `startChange()` 调用时传入当前详情页的 `companyRecordId`：`getLastChangeByLogin({ companyRecordId: this.companyRecordId })`
- 租赁机构管理端 `zljg/companyRecordAgency/detail.vue` 复用同一核心页，一并生效

## 验证要点
- 管理端：经纪机构管理 → 机构入网信息 → 详情 → 变更，Network 请求体应为 `{"companyRecordId":"<当前详情ID>"}` 并跳转变更编辑页

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：7228345d-b39b-4e14-b319-e0de248ed26e
- 涉及文件：`companyRecord.js`、`companyRecordAgency/detail.vue`、`zljg/companyRecordAgency/detail.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_change_fix",
  "source_extraction_id": "28abe140eda94388b87f73b3086a18be",
  "version": 1,
  "memory_type": "entities"
}
-->