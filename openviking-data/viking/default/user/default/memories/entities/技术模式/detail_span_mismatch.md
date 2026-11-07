# 详情页同行 span 不同导致双列不等分
苏州市房地产监测V3 中详情页双字段行因 getItemStyle 按 span 比例分配宽度，同行 span:8 与 span:16+ 引发 1:2 不等分。

## 问题根因
- getItemStyle 按 flex: itemSpan / totalRowSpan 分配宽度
- 同行字段 span:8 与 span:16+keepSpan 引发 1:2 不等分

## 解决方案
- detail-template.vue 强制双字段行 flex: 1 1 0
- normalizeDetailSpan 归一历史 span 为 12
- auxiliaryProject/detail.vue 移除 wideLayout 旧布局

## 涉及文件
- AgencyPersonnelDetail.vue、AgencyBasicInfoDetail.vue、institutionRegister/detail.vue
- agencyBasicInfoContent.js、companyRegister/detail.vue、DeveloperBasicInfoDetail.vue
- developerBasicInfoContent.js、institution/agencyPersonnel/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/010.md
- 所属项目：苏州市房地产监测V3；来源会话：8938ed10-af4c-44bf-8d0c-5e1178985b2e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_span_mismatch",
  "source_extraction_id": "eb40dec2781a45a9a11c09c062168035",
  "version": 1,
  "memory_type": "entities"
}
-->