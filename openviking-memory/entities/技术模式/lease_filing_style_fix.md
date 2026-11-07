# 租赁合同备案模块样式统一修复
产品2.0 项目在三个租赁合同备案模块统一修复列表页与详情页样式问题。

## 修改文件
- assetsLeaseContractFiling/index.vue 与 detail.vue（经营资产租赁合同）
- resourcesLeaseContractFiling/index.vue 与 detail.vue（经营资源租赁合同）
- parkingSpaceContractFiling/index.vue 与 detail.vue（停车泊位租赁管理）
- src/styles/index.scss（全局样式）

## 主要改动
- 列表页说明文字对齐 pubHouseTable 的 operation-hint：左对齐带橙色警告图标，正文 #333 仅标记橙色，上下内边距 8px
- 修复经营资产、停车泊位页面表格标签多余的 >
- 详情页基本信息标题 Headline 补充 titleText="基本信息" 避免标题缺失
- 查看模式 basicInfoList、payeeInfoList 增加 lg/xl:12 两列布局配置
- 列表容器增加 lease-contract-list 类，搜索区与表格卡片之间统一为 12px 间距
- 操作栏垂直居中：标题/按钮行与预警说明合并为 list-card-header，操作栏使用 min-height: 48px + padding: 12px，内容垂直居中
- 说明文字对齐：预警说明纳入表头区域，上下内边距均为 12px
- 详情页 houseTable.vue 资产列表「面积」列改用 amountFormatter 显示千分位（如 1000 → 1,000）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：8331b045-2515-4a08-946d-7d95ffaf7dd5、e48b01c6-3065-4048-9afa-2de4be8dac2a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_filing_style_fix",
  "source_extraction_id": "d29ececa168b4f758ad876f7efb26ee0",
  "version": 2,
  "memory_type": "entities"
}
-->