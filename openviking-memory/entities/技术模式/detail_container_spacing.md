# 详情页容器覆盖 el-row 间隙并归零标题边距
苏州市房地产监测V3 于 index.scss 设 .detail-from-container 为 12px 间距以覆盖 el-row 的 24px gap 并归零 HeadTitle 边距。

## 改动内容
- `.detail-from-container` 设为 12px 间距覆盖 `.el-row` 的 24px gap
- 内部 `HeadTitle` 的 `margin-bottom` 归零消除重复留白
- 各详情页 HeadTitle 与「基本信息」间距统一降至 12px

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/093.md
- 涉及文件：styles/index.scss、HeadTitle/index.vue、Headline/index.vue、variables.css、AgencyPersonnelDetail.vue、AgencyBranchDetail.vue、AgencyBasicInfoDetail.vue、personnelRecord/detail.vue
- 来源会话：8a3f6885-01ea-45ad-9ee1-c73826610428；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_container_spacing",
  "source_extraction_id": "1056cdb0ea05475b865e7d490ec11c28",
  "version": 1,
  "memory_type": "entities"
}
-->