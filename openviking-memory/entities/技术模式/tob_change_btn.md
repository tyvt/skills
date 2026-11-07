
# 企业/经纪机构入网变更详情按钮补全
苏州市房地产监测V3 中开发企业（companyRecord）与经纪机构（agencyRecord）入网变更详情页补全了返回、编辑、流程查看按钮。

## 开发企业
- `toB/companyRecord/detail.vue`：开启返回 `:show-back="true"`；编辑 `:show-edit="showChangeEditBtn"`（`view` + `changeBizState === '0'` + 非审核中 `displayStatus`）；流程查看 `:show-approval="formMode === 'view'"`、`audit-button-text="流程查看"`；增加 `@update="getDetail"`

## 经纪机构
- `toB/agencyRecord/detail.vue`：同上返回、编辑、流程查看、`form-mode-override`；增加 `changeBizState`，在 `detailCallback` / `loadChangeDetailFromOwnCompany` 中维护，`:biz-state` 与 `showChangeEditBtn` 均依赖该状态

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`toB/companyRecord/detail.vue`、`toB/agencyRecord/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：651e58d0-833a-407d-b950-d0210aaf6ccc


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "toB_change_btn",
  "source_extraction_id": "96ca86b0c3a64f9d81fb857532a1c43b",
  "version": 1,
  "memory_type": "entities"
}
-->