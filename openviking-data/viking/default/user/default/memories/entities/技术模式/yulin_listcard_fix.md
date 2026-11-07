# 榆林分支列表list-card包裹层丢失修复
产品2.0 的 develop/v2.6.2-yulin 分支因合并问题丢失了多个页面的 list-card 包裹层，已修复。

## 分支对比
- develop/v2.6.2 基础分支本身问题不大，仅「权利人同步」缺 list-card
- develop/v2.6.2-yulin 才是主要问题：4 个页面的 list-card 被弄丢
- 丢失发生在从 2.6.2 做榆林定制时，与 getQueryParams 的 B 端改动一起合入出的问题

## 受影响页面
- 物业管理区域备案：yulin 分支丢失 → 已修复
- 物业管理区域变更：yulin 分支丢失 → 已修复
- 楼栋授权：yulin 分支丢失 → 已修复
- 权利人同步：develop 与 yulin 均缺 → 已修复

## 已完成修复
- develop/v2.6.2：syncObligee/index.vue 已修复并提交，提交号 1d2718782

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：syncObligee/index.vue、property/complex/index.vue、RegionTreeLayout.vue
- 所属项目：产品2.0；来源会话：7ae7d4b9-281a-4316-bf51-824355179604；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yulin_listcard_fix",
  "source_extraction_id": "d5e51a3170d5493aafd467d465fcc484",
  "version": 1,
  "memory_type": "entities"
}
-->