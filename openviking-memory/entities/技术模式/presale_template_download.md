# 预售模板下载复用下载模板写法
苏州市房地产监测V3 中预售模板下载实现与要件"下载模板"对齐，按钮样式布局保持不变，下载逻辑收敛至统一方法。

## 背景
- 原父组件手写 fetch + blob 下载逻辑分散
- 需与要件"下载模板"写法对齐，保持按钮样式布局不变

## 解决方案
- 下载逻辑收敛至 PermitPlanPanel 的 handleDownloadPlan
- 调用 downloadServerAssetFile 与 getFileNameFromAssetUrl
- detail.vue 通过 plan-file-name 传入文件名回退
- 移除父组件手写 fetch + blob

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/231.md
- 涉及文件：presale/permit/components/PermitPlanPanel.vue、components/AnnexUpload/components/AppendixRequirementCard.vue、presale/permit/components/detail.vue、utils/resolveServerAssetUrl.js、presale/permit/plan/detail.vue、presale/cashsale/components/CashsaleDetail.vue、components/Headline/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：01a162f6-f9ee-70c5-a400-762d8e5d1d63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_template_download",
  "source_extraction_id": "eedd71c4edcc4cedbfdf3ec5cf02cc9a",
  "version": 1,
  "memory_type": "entities"
}
-->