# 物业管理区域详情综合查询功能移除
园区公共收益项目中，物业管理区域详情页综合查询弹窗因拉取关联数据失败且无数据，经项目经理确认后移除该功能。

## 问题根因
- complex/detail.vue 综合查询弹窗经 /property/complex/queryComplexRelatedByComplexId 接口拉取关联数据失败，显示暂无数据

## 解决方案
- 按项目经理确认移除该功能而非修复
- 已删除按钮、StatisticsDialog 组件及引用、相关字段与 getQueryData 方法

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：e43a5f22-6390-48a0-81a9-f2d8bc611ef1
- 涉及文件：src/views/property/complex/detail.vue、src/views/property/complex/components/StatisticsDialog.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_query_removed",
  "source_extraction_id": "aba4a2b6479d4f45a2363f3e0f9679b4",
  "version": 1,
  "memory_type": "entities"
}
-->