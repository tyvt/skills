# 经纪人员详情页户籍地址错位修复
苏州市房地产监测V3 中 AgencyPersonnelDetail.vue 查看态「户籍地址」因 FORM_COL_WIDE 撑破两列栅格导致错位，已全局排查并修复。

## 问题根因
- AgencyPersonnelDetail.vue 查看态「户籍地址」是全表唯一配 FORM_COL_WIDE（span=16）的字段，其余字段均为 span=12
- 该详情用 DetailTemplate :column="2" 两列栅格，两列模式下 span=16 未被归一化（仅 8→12），该项被撑到 66.7% 宽，打破 50/50 栅格
- 标签列宽计算不认 span=16，「户籍地址」标签按 4 字算宽（88px），左列其他行按最长标签「资格证书类型」6 字算宽（116px），导致该行值整体错位

## 修改内容
- layout 统一改为 HALF_LAYOUT，与其他字段一致
- 移除不再使用的 FORM_COL_WIDE 导入

## 全局排查与归属
- 全项目仅两处两列 DetailTemplate（LeasePersonnelDetail / AgencyPersonnelDetail），前者全部 HALF 无问题，后者是唯一错位点
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、zhi2-web-admin/src/views/institution/leasePersonnel/components/LeasePersonnelDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：df6caac4-1d69-43b0-b9fe-7fd0af3007ab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_align",
  "source_extraction_id": "1b1aa05893f34d1eb5a371aa9023b5b0",
  "version": 1,
  "memory_type": "entities"
}
-->