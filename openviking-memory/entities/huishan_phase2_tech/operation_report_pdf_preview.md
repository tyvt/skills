
# 经营报告PDF预览由preview.vue路由承载
惠山二期H5 中经营报告 PDF 预览由新增 `src/pages_benefit/operationReport/preview.vue` 承载，H5 用 iframe 内嵌预览，小程序调系统预览。

## 实现方式
- 新增 `src/pages_benefit/operationReport/preview.vue` 承载 PDF 预览
- H5：全屏 `iframe` 内嵌预览 PDF；小程序：加载后自动调起系统 PDF 预览，页面保留「打开报告」按钮可再次查看
- 预览页含加载中、失败重试状态
- `pages.json` 注册路由 `/pages_benefit/operationReport/preview`
- `src/utils/operationReport.js` 新增 `navigateToOperationReportPreview()`
- `src/pages/index/newHome.vue` 的 `handleOperationReport` 改调该函数替代 `window.open`

## 交互流程
- 首页点击「共有资金收支报告」卡片 → 进入「经营报告」预览页 → 加载 PDF → H5 页面内预览

## 涉及文件
- src/pages_benefit/operationReport/preview.vue
- pages.json
- src/utils/operationReport.js
- src/pages/index/newHome.vue

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话ID：d398aaa2-b1af-439d-a4a4-9dda41fd6e89；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "operation_report_pdf_preview",
  "source_extraction_id": "59ff5c92ec0d437c8dd9b0e558026b29",
  "version": 2,
  "memory_type": "entities"
}
-->