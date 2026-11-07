# 操作日志关联单据跳转
园区公共收益系统操作日志列表关联单据列绑定 `dataId`，仅当同时存在 `dataId` 与 `menuPath` 时渲染可点链接跳业务详情。

## 列与搜索收敛
- 保留序号、IP、操作人、操作时间、操作类型、操作模块、关联单据；去掉日志编号、请求方式、操作状态及操作列。
- 搜索区合并为操作人、操作时间范围、操作类型、操作模块。

## 跳转条件
- 关联单据列绑定 `dataId` 展示；仅有 `dataId` 无 `menuPath` 显示普通文本，需后端补 `menuPath` 才能跳转。
- 同时存在 `dataId` 与 `menuPath` 时渲染链接，点击路由到对应业务详情（如 `formMode: view`）。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/system/operlog/index.vue。
- 所属项目：园区公共收益；来源会话：1b7f5e8f-ac1f-4935-9652-385023facdc9；代码基线：ba114dc。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operlog_dataid_jump",
  "source_extraction_id": "26c4c443e80649a0bdd7a9c3a71c55c0",
  "version": 1,
  "memory_type": "entities"
}
-->