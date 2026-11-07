# 资产弹窗同步projectId
园区公共收益 Web 后台 B 端数据隔离以全局物业管理区域为准，列表已注入 projectId 时资产选择弹窗须同步隔离参数。

## 问题根因
- B 端列表 `getQueryParams` 已注入 `projectId`（来自 `$store.getters.currentProjectId` 即 complexId），但「新增 → 选择资产」弹窗仍用静态 filter，导致列表有隔离、弹窗可选全库资产。

## 解决方案
- 增加计算属性 `assetFilterParams`：固定业务键（如 `forPart: '1'`）与 `...(terminalType === 'B' ? { projectId: currentProjectId } : {})` 合并，传给选择弹窗的 filter/query。
- G 端不传 projectId，与 `pubHouse`、`pubHousePartChange` 等同模块页保持同一写法。

## 验证与归属
- 验证会话：a180a359（housePart 列表已有 B 端 projectId，新增 assetFilterParams 供新增选资产弹窗过滤）
- 涉及文件：zhi2-web-admin/src/views/benefit/housePart/index.vue、zhi2-web-admin/src/store/getters.js、zhi2-web-admin/src/utils/projectContext.js
- 所属项目：园区公共收益；代码基线：b6bf87d；来源会话：a180a359-6a19-4e62-9482-de768285233e

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "资产弹窗同步projectId",
  "source_extraction_id": "1e816f9fc3aa4168b1160713b0d4dc9c",
  "version": 1,
  "memory_type": "entities"
}
-->