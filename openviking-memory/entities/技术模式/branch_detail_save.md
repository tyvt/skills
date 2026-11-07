# 分支机构详情查看态头部保存按钮未按业务状态隐藏
苏州市房地产监测V3 中分支机构详情查看态头部仍显示「保存」按钮，因按钮组未按业务状态限制可编辑性。

## 问题根因
- `AgencyBranchDetail.vue` 中 `canEditInHeader` 限定仅 B 端且 `bizState === '0'` 未注销可编辑
- `showSaveButton` 仅新增或满足 `canEditInHeader` 时显示
- `isViewDisplay` 在查看或不可编辑时强制只读

## 关键逻辑
- 头部按钮组需依业务状态限制可编辑性，避免查看态显示保存
- 涉及 `detailMixins.js`、`form.js`、`OperationBtnGroup/index.vue` 等共用逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/112.md
- 涉及文件：institution/agencyBranch/components/AgencyBranchDetail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、mixins/detailMixins.js、property/complex/detail.vue、components/OperationBtnGroup/index.vue、institution/agencyBranch/components/AgencyBranchList.vue、mixins/form.js、main.js
- 所属项目：苏州市房地产监测V3；来源会话：27689708-9f9b-4386-9993-e547142b1ab3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_detail_save",
  "source_extraction_id": "7785caa3c5c24e6b944f6400144eda26",
  "version": 1,
  "memory_type": "entities"
}
-->