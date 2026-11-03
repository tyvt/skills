# 变更单保存后须将 formMode 置为 view
苏州市房地产监测V3 中变更单保存成功后需通过路由把 formMode 改为 view，否则停留编辑态。

## 问题背景
- 变更单保存成功分支未将路由 formMode 改为 view
- 导致页面停留编辑态且提交按钮不展示

## 修复方式
- 在 `AgencyPersonnelDetail.vue` 与 `LeasePersonnelDetail.vue` 的 `handleSave` 中处理
- 通过 `$router.replace` 将 `query.formMode` 置为 `'view'`
- 保留 `changeActive` 与 `personnelRecordChangeId` 走变更接口
- 移除冗余的 `loadChangeDetail` 调用

## 涉及文件
- `institution/agencyPersonnelApply/detail.vue`
- `institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
- `company/staffManagement/components/detail.vue`
- `institution/leasePersonnel/components/LeasePersonnelDetail.vue`
- `main.js`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/155.md
- 来源会话：01a16360-a5d9-70c5-a400-7674006fbdc1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_formmode_view",
  "source_extraction_id": "66fbda70d2034d4ea98cc557510b2ef8",
  "version": 1,
  "memory_type": "entities"
}
-->