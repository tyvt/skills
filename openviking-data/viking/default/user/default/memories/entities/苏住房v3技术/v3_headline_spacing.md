# V3 详情页 Headline 区块间距全局修复
苏州市房地产监测V3 修复详情页 Headline 区块间距叠加问题，E2E 用例通过。

## 原因
- 两套规则同时生效：`detail-container` 直接挂 Headline 时 `gap:24px` 又加 `margin-bottom:16px` 约 40px；`detail-from-container` 内表单 `row-gap:16px` 又加 `margin-top/bottom:16px` 约 32px

## 修复方式
- `detail-container`：只靠 `gap:24px`，去掉 Headline 的 `margin-bottom`
- `detail-from-container` 内表单：只靠 `row-gap:16px`，去掉子级 `margin`
- `AgencyBasicInfoForm` 内部：继续用 `row-gap:16px`（不再额外加 `margin-top`）

## 验证与归属
- E2E 两条用例通过：机构备案详情间距 16–24px
- 涉及文件：`company/institutionRegister/detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：7d944204-556e-42c4-aea2-49cfa70bd1db；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_headline_spacing",
  "source_extraction_id": "b92f718b8a55409ca3d47ef5e5f4ce65",
  "version": 1,
  "memory_type": "entities"
}
-->