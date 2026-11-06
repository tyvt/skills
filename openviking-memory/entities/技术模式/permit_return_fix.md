# 预售许可申请维护返回楼幢列表清空修复
苏州市房地产监测V3 的 Bug 6275：预售许可申请跳转预售方案维护后返回，预售楼幢列表被清空，已在路由与详情组件修复。

## 问题根因
- hash 路由 returnPath 错误拼接 restore 参数导致返回路径异常
- 编辑态未对 selectedBuildings 做快照，返回后 getDetail 将其覆盖清空

## 修复内容
- presale/permit/components/detail.vue 与 permitConstants.js 新增 buildPermitApplyReturnPath 构建返回路径
- 新增 PERMIT_PLAN_NAV_DRAFT_KEY 作为方案导航草稿键
- 新增 tryRestorePlanNavDraft 恢复方案导航草稿状态

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：presale/permit/components/detail.vue、permitConstants.js
- Bug 编号：6275

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_return_fix",
  "source_extraction_id": "2bb18c12d6ab4389aa7e1f8178917a15",
  "version": 1,
  "memory_type": "entities"
}
-->