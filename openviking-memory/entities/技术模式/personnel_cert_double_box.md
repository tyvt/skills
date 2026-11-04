# 经纪与租赁从业人员证件双框放大
苏州市房地产监测V3中经纪机构和租赁机构的从业人员布局双框放大，并解决窄窗口挤扁字段问题，已交付。

## 尺寸变化
- 单个框：147×222 → 180×270（保持2:3证件照比例）
- 双框+间距：334 → 400（180+40+180）

## 窄视口断点
- ≥1440：单框180×270，字段列宽307
- 1200–1439：单框140×210，字段列宽275
- <1200：单框120×180，字段列宽195
- 1080/1280/1440三视口实测通过，两列不塌陷、比例不变

## 坑与修复
- .ppf-box断点规则初始写在基础规则之前，同权重被覆盖，出现120×270畸形比例；已把断点移到样式表末尾

## 回归结果
- npm run test:e2e:personnel-basic-info-visual → 3 passed / 1 skipped

## 涉及文件
- zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue
- zhi2-web-admin/src/views/zljg/components/PersonnelCertificatePlaceholder.vue
- public/version.js

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：915ed5ff-cf9a-4851-90fa-8106f68627f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_cert_double_box",
  "source_extraction_id": "92e7ab2dd37c4b28a3ace3ca3b1a5395",
  "version": 1,
  "memory_type": "entities"
}
-->