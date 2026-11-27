---
audit_status: valid
last_checked: 2026-11-27T18:18:59+08:00
verdict_note: 太仓G zhi1-web-admin/src/views/register/index.vue-414-417 companyId计算忽略哨兵add(validRouteApplyId)，与描述一致
---
# 注册页路由哨兵值导致401
注册页 `/register/add` 的路由段 `add` 被当作公司 ID 使用，选择机构类型时请求 `GET /company/base/add` 并返回 401。

## 问题根因
- 路由 `/register/add` 把 `add` 放入 `params.applyId`
- 页面误把 `params.applyId` 当成公司 ID
- 选择机构类型时因此请求 `GET /company/base/add`，触发 401

## 修复方案
- 修复时忽略路由中的哨兵值 `add`，不将其作为公司 ID
- 现状：companyId 已忽略 `add` 哨兵值，真实 ID 与查询参数逻辑保留
- 恢复成功后原有的验证码刷新逻辑
- 修复后重新构建，并用真实点击复测注册流程

## 涉及场景
- 注册页机构类型选择
- 公司基础信息接口 `GET /company/base/add`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_add_401",
  "source_extraction_id": "63d42109e0784ce6aa7875c728b775b9",
  "version": 2,
  "memory_type": "entities"
}
-->