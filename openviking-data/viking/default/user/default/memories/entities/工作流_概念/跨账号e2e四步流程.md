# 产品2.0 跨账号 E2E 四步串行流程
针对必须两端角色才能闭环的功能（如企业变更备案），单角色用例只能覆盖一半，须把同一 spec 写成默认串行的 4 步，用账号切换走完真实操作链。

## 四步写法
- 01 企业账号登录，确认单据已备案(bizState=2)且能发起变更。
- 02 企业账号点「变更」→ 改字段 → 保存 → 提交 → 回企业信息页断言「审核流程查看」可见。
- 03 loginAsAdmin 重新登录 → 进企业变更列表 → 按统一社会信用代码/企业名搜索 → 进详情 → 审批通过。
- 04 loginAsCompany 登回企业账号，断言字段已更新、变更按钮恢复、无在途审核。

## 三条硬约束
- 管理端必须走「列表搜索→进入详情→审批」真实路径，不要拼 URL 直进详情绕过导航/权限，否则测出的绿是假绿。
- 两端切换靠 fixtures（auth-helpers / company-helpers 的 loginAsCompany、loginAsAdmin），不手写登录表单。
- 前置数据不满足（企业 bizState=1 而非已备案 2）时整组按预期 skip 并在报告写明原因，不改断言硬凑通过。

<!-- MEMORY_FIELDS
{
  "category": "工作流/概念",
  "name": "跨账号E2E四步流程",
  "source_extraction_id": "e291f717946845139744abecf28fd921",
  "version": 1,
  "memory_type": "entities"
}
-->