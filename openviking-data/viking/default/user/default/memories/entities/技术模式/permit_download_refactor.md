# 预售模板下载对齐要件下载模板写法
苏州市房地产监测V3 中预售模板下载逻辑收拢至 PermitPlanPanel 的 handleDownloadPlan，统一调用下载工具函数。

## 问题根因
- 父组件手写 fetch + blob 实现预售模板下载，与要件下载模板写法不一致

## 解决方案
- 将预售模板下载逻辑收拢至 PermitPlanPanel 的 handleDownloadPlan
- 调用 downloadServerAssetFile 与 getFileNameFromAssetUrl
- detail.vue 通过 plan-file-name 传入文件名回退
- 移除父组件手写 fetch + blob 实现

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/031.md
- 涉及文件：presale/permit/components/PermitPlanPanel.vue、AnnexUpload/components/AppendixRequirementCard.vue、presale/permit/components/detail.vue、utils/resolveServerAssetUrl.js、presale/permit/plan/detail.vue、presale/cashsale/components/CashsaleDetail.vue、components/Headline/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a162f6-f9ee-70c5-a400-762d8e5d1d63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_download_refactor",
  "source_extraction_id": "1dd7ee5fdfbc4d55b597a754b7eaeeee",
  "version": 1,
  "memory_type": "entities"
}
-->