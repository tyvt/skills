# 下线操作指引 Tab 的完整处置
住房租赁线取消「查询」Tab 时，需从配置、内容、路由守卫、e2e、视觉基准到 README 全链路处置，避免老链接白屏。

## 背景与原因
- 操作指引住房租赁线取消「查询」Tab（只剩企业/经纪机构/个人），老链接 ?line=rental&tab=query 打开不能白屏
- Tab 开关散落多处：元配置、内容配置、路由 tab 参数合法性、e2e 用例与视觉基准 fixtures

## 处置步骤
- config/operationGuideMeta.js 删 Tab 项，config/operationGuideContent.js 删对应内容块（3 张查询卡）
- 路由守卫把旧参数自动 replace 成默认 Tab（tab=query → tab=enterprise），不白屏不报错
- e2e 改写 2 条用例 + 新增「query 回落 enterprise」断言；视觉基准移除「住房租赁-查询」且保持其余 index 编号不变
- README.md 同步 Tab 列表、设计图对照表与相似度表

## 最小改动约定
- 按最小改动保留组件分支（contract-query 分支、RentalContractQueryPanel.vue、operationGuideContract.scss 一行不改），变死代码交用户决定
- 顺带确认首页「住房租赁合同备案查询」入口走 publicPortal 不受影响

## 涉及文件与归属
- 涉及文件：operationGuideMeta.js、operationGuideContent.js、operation-guide.spec.ts、operation-guide-designs.ts、README.md
- 所属项目：门户；来源会话ID：session-11acc9b9-5d50-4695-badd-30549e22593b；代码基线：b6165db

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_tab_removal",
  "source_extraction_id": "b52d446d4244401c9fcc19d40ef516e9",
  "version": 1,
  "memory_type": "entities"
}
-->