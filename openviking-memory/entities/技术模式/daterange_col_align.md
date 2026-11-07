# el-col栅格最小宽致日期范围未对齐
苏州市房地产监测V3中personnelCertificate/detail.vue的证书有效期daterange置于el-row/el-col下被Element默认最小宽度撑出列宽导致未对齐。

## 问题根因
- 证书有效期使用daterange置于el-row/el-col下
- 被Element默认最小宽度撑出列宽导致未对齐

## 修复方案
- 外层改div.detail-from-container、zs-form设label-position="top"
- 编辑区改用section-form与section-field并套用detail-form.scss的min-width:0栅格实现同宽

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/063.md
- 涉及文件：personnelCertificate/detail.vue、detail-form.scss、QualificationFormSection.vue、DeveloperBasicInfoForm.vue等
- 所属项目：苏州市房地产监测V3；来源会话：819c3c2f-b512-4af8-bde8-ad7a2b56d9c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "daterange_col_align",
  "source_extraction_id": "2631256d0f3846be87323d35fca57b3e",
  "version": 1,
  "memory_type": "entities"
}
-->