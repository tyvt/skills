
# 经营报告PDF预览由preview.vue路由承载
惠山二期H5 中经营报告 PDF 预览由新增 `src/pages_benefit/operationReport/preview.vue` 承载，H5 用 iframe 嵌入，小程序调系统预览。

## 实现方式
- 新增 `src/pages_benefit/operationReport/preview.vue` 承载 PDF 预览，H5 用 iframe 嵌入，小程序调系统预览
- `pages.json` 注册路由，`src/utils/operationReport.js` 新增 `navigateToOperationReportPreview()`
- `newHome.vue` 的 `handleOperationReport` 改调该函数替代 `window.open`

## 涉及文件
- d:/repository/惠山二期H5/无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/pages/webview/home.vue
- d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/fundPublicity/benefit.vue
- d:/repository/惠山二期H5/无锡市区/wygl-wxxcx-dev-slh/pages/webview/home.vue
- d:/repository/惠山二期H5/无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/elevatorPubEngCons/index.vue
- d:/repository/惠山二期H5/无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/elevatorPubEngCons/detail.vue
- d:/repository/惠山二期H5/无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/pages.json
- d:/repository/惠山二期H5/无锡市区/zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js

## 验证与归属
- 验证证据：src=惠山二期H5/001.md
- 来源会话ID：d398aaa2-b1af-439d-a4a4-9dda41fd6e89；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "operation_report_pdf_preview",
  "source_extraction_id": "0b26267c8a824d6cbbc1779587ddb493",
  "version": 1,
  "memory_type": "entities"
}
-->