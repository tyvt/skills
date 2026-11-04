# 报表页大块空白修复
太仓存量房项目 `queryIsResidentialContractList.vue` 报表页因两个 `.main-box` 高度撑满一屏导致中间大块空白的 bug 与修复。

## 根因
- 原两个 `.main-box` 都被设 `height: calc(100vh - 65px)`，查询区被撑满一屏，中间出现大块空白
- 空 `el-form-item` 占位 4 个偏多

## 修复要点
- 去掉 scoped 样式中的 `.main-box` 高度设置
- 仅报表容器使用内联样式：`margin-top:5px;height: calc(100vh - 65px);overflow: auto;`，查询区随内容自适应高度
- 空 `el-form-item` 从 4 个减为 2 个（与同目录 `housingTransferList` 一致）
- 多行查询时若滚动区偏高/偏低可参考 `contractRecordReportList`，高度改为 `calc(100vh - 162px)`

## 验证与归属
- 验证证据：extracted source=cursor project=太仓存量房
- 涉及文件：src/views/stokeRoomOnlineSignSys/statement/queryIsResidentialContractList/queryIsResidentialContractList.vue、同名 .js
- 所属项目：太仓存量房；来源会话ID：40ebf349-c632-4932-a588-7e64f006ba8d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "residential_report_blank",
  "source_extraction_id": "01c154a07db54d8984186784c41f0503",
  "version": 1,
  "memory_type": "entities"
}
-->