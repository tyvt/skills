# 变更单查看误落备案详情入口致错调备案接口
苏州市房地产监测V3 列表「查看」通过 navigateToTodoTask 按备案 busCode 解析路由，导致变更单 ID 误调备案详情接口。

## 问题现象
- 变更单列表「查看」落到备案详情入口，query 仅带 formMode: 'view'
- 变更单 ID 误调备案详情接口，数据错误

## 根因
- navigateToTodoTask 按备案 busCode 解析路由，未区分变更单与备案
- 跳转未传 isChange 标记，未调用变更单专属接口

## 解决方案
- 修改 companyChangeManage/index.vue 跳转至 company/companyManagement/change/detail 等变更路由
- 传 isChange=true 并调用 getCompanyRecordChangeDetail 等变更单接口
- 资质与人员同理跳转各自变更详情路由

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/066.md
- 验证证据另见 src=苏州市房地产监测V3-rest/006.md
- 涉及文件：companyChangeManage/index.vue、companyChangeManage.js、companyManagement/change/detail.vue、companyRecordChangeRoute.js、companyAdminChange.js
- 来源会话ID：01a1619b-c75f-7553-b4af-dfe3ee83454d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_view_wrong_api",
  "source_extraction_id": "7fed42c0b2674fd1a74d910b81296118",
  "version": 2,
  "memory_type": "entities"
}
-->