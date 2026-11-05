# 提示语间距因双重padding变大修复
园区物管2.0 中提示语因自身 padding-bottom 与表格容器 padding-top 叠加，导致下方间距比上方大一倍，已调整为统一 12px。

## 问题背景
- 提示语原设置 padding-bottom: 12px，而表格容器本身还有 padding-top: 12px，使下方间距变成 24px，比上方更大

## 解决方案
- 提示语改为 padding: 12px 12px 0，上下间距均为 12px
- 上方：标题分隔线到提示语 = 12px
- 下方：提示语到表格 = 12px（由表格容器上内边距提供）

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRevenueContract/index.vue、zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/index.vue 等
- 所属项目：园区物管2.0；来源会话：14b45942-7d90-49e2-9568-f168ec1c668e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prompt_double_padding",
  "source_extraction_id": "7f0421bf3af94f03b6b0c602ea55cca8",
  "version": 1,
  "memory_type": "entities"
}
-->