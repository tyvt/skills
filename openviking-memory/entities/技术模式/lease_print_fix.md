# 住房租赁合同备案详情缺打印按钮
苏州市房地产监测V3 中住房租赁合同备案详情页因 OperationBtnGroup 默认走公共配置未消费详情接口字段，导致打印按钮不渲染，须传入详情接口返回字段补充渲染。

## 问题根因
- `OperationBtnGroup` 默认走公共 `ZsPrint` 组件，按钮渲染取决于 `/print/config/printList`（按 `busCode=zlhtba`）是否返回打印模板。
- 该菜单未配置模板 → `printList` 为空 → `ZsPrint` 内部 `v-if` 全部不成立 → 整个按钮不渲染。
- 后端详情接口已直接返回成品 PDF `recordCertSite`，无需再走打印模板配置。

## 解决方案
- `src/views/presale/leaseContract/detail.vue`：`createForm()` 增字段 `recordCertSite`；接 `custom-print` + `print-test-id="lease-contract-print-cert-btn"` + `@print="handlePrintRecordCert"`；新增 `canPrintRecordCert` 计算属性与 `handlePrintRecordCert()`：`window.open(resolveServerAssetUrl(form.recordCertSite), '_blank')`。

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/230.md
- 涉及文件：presale/leaseContract/detail.vue、components/OperationBtnGroup/index.vue、presale/leaseContractEntry/detail.vue、e2e/fixtures/lease-contract-mocks.js、components/ZsPrint/index.vue、company/companyManagement/components/AgencyBasicInfoDetail.vue、utils/resolveServerAssetUrl.js、e2e/presale/lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：1366cb94-51af-4636-844f-b762c95373e7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_print_fix",
  "source_extraction_id": "393ff4b197654fe9a049ff3d076ab662",
  "version": 3,
  "memory_type": "entities"
}
-->