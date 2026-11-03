# 备案态详情未用裸ID则加载失败
苏州市房地产监测V3 中资质管理详情页非变更分支误用 qualificationRecordId 包裹，导致备案详情加载失败。

## 问题根因
- 非 `isChange` 分支 `getDetail` 发送 `{ qualificationRecordId: id }`，与同文件 `initDict` 及变更单使用的裸 ID 不一致
- 请求体不一致致备案详情加载失败

## 修复方案
- 改为裸 ID 调用：`this.$post(this.detailApiFull, this.id || this.getId(), { headers: { 'Desensitize-Flag': this.desensitizeFlag } })`
- 统一详情接口入参为裸 ID

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/102.md
- 涉及文件：zhi2-web-admin/src/views/company/qualificationManagement/components/detail.vue、src/api/company/qualificationRecord.js、src/components/OperationBtnGroup/index.vue、src/mixins/changeObjectMixins.js、src/utils/resolveChangeId.js、src/api/index.js、src/views/company/companyAdminChange/detail.vue、src/views/company/staffManagement/components/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：9cb1f965-1478-4b6f-8af2-fc6251563e80；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_id_bug",
  "source_extraction_id": "6b21eb3133284f8db9bc26155421bece",
  "version": 1,
  "memory_type": "entities"
}
-->