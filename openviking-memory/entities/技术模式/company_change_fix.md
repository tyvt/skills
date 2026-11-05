# 企业基本信息变更功能与403降级修复
企业基本信息页面增加变更功能，测试中发现保存接口403，顺带修复多项前端阻塞。

## 测试与问题
- 用例01-03通过，04修改并保存变更失败：`POST /company/companyRecordChange/update` 返回403无权限
- 05-07未执行因 serial 中断

## 前端修复点
- `getId()` 优先读 `route.query.id`，避免 E2E 路由下 `busId` 变 `__e2e__`
- `OperationBtnGroup` 无效 `busId` 时不再调用 `listAppendixPackage`
- 变更编辑页去掉 `operation-btn-group` 上误传的 `bus-code`
- `detail` 403降级：`noMessage + noReject` 后回退 `getOwnCompany` 加载表单
- 「继续变更」按钮相关修复（原文截断）

## 验证与归属
- 涉及文件：`CompanyBasicInfoDetail.vue`、`toB/companyRecord/detail.vue`、接口文档前端.md
- 所属项目：产品2.0；来源会话：4e2633d3-54fb-423b-88ed-c035d9f7d33c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_fix",
  "source_extraction_id": "e126efa632a44debbf017f2d54ab133a",
  "version": 1,
  "memory_type": "entities"
}
-->