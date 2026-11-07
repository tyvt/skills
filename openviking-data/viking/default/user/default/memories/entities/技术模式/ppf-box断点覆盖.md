# .ppf-box断点前置被覆盖致比例畸形
苏州市房地产监测V3 的 zhi2-web-admin 修复 .ppf-box 断点规则被覆盖导致比例畸形的问题。

## 问题现象
- .ppf-box 断点规则写在基础规则前，同权重被覆盖，仅宽被 flex 压窄而高保持 270px 致 120x270 畸形比例

## 解决方案
- 将断点移至样式表末尾，并按视口收敛尺寸：≥1440 为 180×270，1200–1439 为 140×210，<1200 为 120×180

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/008.md
- 涉及文件：AgencyPersonnelDetail.vue、PersonnelCertificatePlaceholder.vue、LeasePersonnelDetail.vue、agencyBasicInfoContent.js、detailLayout.js、detail-template.vue、LeaseEntryNetworkSections.vue、UploadCert.vue 等
- 来源会话ID：915ed5ff-cf9a-4851-90fa-8106f68627f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ppf-box断点覆盖",
  "source_extraction_id": "44f7515355854140bc059576d630812f",
  "version": 1,
  "memory_type": "entities"
}
-->