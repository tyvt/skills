# 备案详情漏读extend致国有投资显-
苏州市房地产监测V3 项目备案详情因漏读接口 extend 字段，导致国有投资金额及占比在后端仅回写 extend 时显示 "-"。

## 问题现象
- 国投金额(prjCountryFee)及占比(investCountry)存于接口 extend 或 projectExtend
- detailCallback 仅读 projectExtend，后端只回写 extend 时 DetailTemplate 显示 "-"

## 解决方案
- 新增 views/projectManagement/customerProject/utils/projectExtend.js 合并解析 extend 与 projectExtend
- detail.vue 与 changeDetail.vue 用 assignProjectFormFields 回写字段
- 修复 getProportion 的 NaN 问题

## 验证与归属
- 验证证据：cursor session=854b6afa-4257-43db-a5bb-19723cfbdf12
- 涉及文件：views/projectManagement/customerProject/detail.vue、views/projectManagement/customerProject/changeDetail.vue、views/projectManagement/customerProject/utils/projectExtend.js、mixins/detailMixins.js、mixins/form.js、api/lpgl/projectinfo.js、views/company/companyRegister/detail.vue、utils/apiV3Normalize.js、views/building/project/detail.vue
- 来源会话ID：854b6afa-4257-43db-a5bb-19723cfbdf12

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filing_extend_miss",
  "source_extraction_id": "e4d17952d7944d45bd6e4325da53fe2a",
  "version": 1,
  "memory_type": "entities"
}
-->