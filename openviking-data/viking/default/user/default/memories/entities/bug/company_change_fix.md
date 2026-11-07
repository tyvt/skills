# 企业信息变更统一管理列表查看页未授权修复
苏州市房地产监测V3 修复企业信息变更统一管理列表（companyChangeManage）点击「查看」时报「页面未授权 / 详情页未授权或不存在」的问题。

## 问题根因
- companyChangeManage 列表只有 index.vue，没有自己的详情页；设计是点「查看」时用接口返回的 row.path（必要时配合 row.busCode）跳到对应业务的原详情页
- 工作区曾删掉自定义 handleView，点击走 listMixins 默认逻辑，通过 buildDetailNavigation 找不存在的 company/companyChangeManage/detail，导致未授权报错

## 修复方案
- 在 index.vue 恢复 handleView：有 busCode 时走 navigateToTodoTask（按当前用户菜单解析路由），否则 router.push(row.path)
- 恢复 BIZ_STATE_OPTIONS：列表/筛选里的业务状态选项（之前误删导致 bizStateOptions 为空）
- 若一进列表就报错，多为接口权限问题，需账号具备 company:companyChangeManage:list

## 验证与归属
- 涉及文件：company/companyChangeManage/index.vue、store/modules/permission.js、mixins/listMixins.js
- 所属项目：苏州市房地产监测V3；来源会话ID：fc9f2f5b-7f58-47f1-be73-e59f5fd42d8b；代码基线：none
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "company_change_fix",
  "source_extraction_id": "ef4db781436145ec93f7842d9de5a47f",
  "version": 1,
  "memory_type": "entities"
}
-->