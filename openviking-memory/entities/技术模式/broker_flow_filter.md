# 经纪端首页业务流程须按 permittedCodes 过滤板块
门户首页 `mergeBusinessFlows` 在 `variant === 'broker'` 时若固定用 `BROKER_SECTION_CODES` 而不按 `permittedCodes` 过滤，仅部分权限用户仍见完整默认流程。

## 问题根因
- `mergeBusinessFlows` 在 broker 下固定 `BROKER_SECTION_CODES`，不像 admin/developer 用 `permittedCodes`/`authorizedSectionCodes` 过滤
- 仅有 `portal:bizSection:*` 部分权限用户仍见完整「住房租赁」等默认流程（含可点击步骤），与旧版 `flows.filter(perms...)` 不一致

## 修复要点
- `sectionCodes = BROKER_SECTION_CODES.filter((code) => permitted.has(code))`
- 超管走 `isSuperAdmin` 全量分支不受影响

## 验证与归属
- 验证证据：代码审查 [HIGH] 经纪端板块未按权限过滤：homeLayout.js:182-183 固定 BROKER_SECTION_CODES，仅有 secondHandHouseTrade 权限仍渲染完整住房租赁流程
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- 所属项目：门户；代码基线：b84b4e7；来源会话ID：a55a779b-e7ae-4471-b38f-138e8f7b8d30

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_flow_filter",
  "source_extraction_id": "56a38fda692548cf82b2bcef6e1ba103",
  "version": 1,
  "memory_type": "entities"
}
-->