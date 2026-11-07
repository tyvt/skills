
# 默认小区缺失街道社区数据修复
园区物管2.0 的 B 端新增页在带默认小区时，因竞态与提前返回导致街道、社区名称未写入表单的 bug 与修复。

## 问题根因
- initCurrentProject 请求 /property/complex/{projectId} 并调用 applyPropertyProjectRow，街道/社区需通过 getSubdistrictNameByCode/getCommunityNameByCode 从 area mixin 字典反查
- 竞态：initDict 立即执行 initCurrentProject，而街道/社区列表在 created 里异步加载，反查时字典常为空得 undefined
- 提前返回：若 form.projectId 已有值（如 session 缓存）直接 return，即使街道/社区为空也不再补全

## 修复方案
- 在 pubParkingRate/detail.vue 新增 syncSubdistrictCommunityFromCodes：字典未就绪时用 $watch 等待加载完成再写入名称
- 调整 initCurrentProject：缺少街道/社区时用当前或默认 projectId 重新拉取小区并补全数据

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：B 端进入新增页、带默认小区时街道社区能正确写入表单并随保存提交
- 涉及文件：pubParkingRate/detail.vue、assetLeaseApply/detail.vue、mixins/area.js 等
- 所属项目：园区物管2.0；来源会话：6e97f2b9-b0d9-4363-889e-533667c5bbef；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_community_fix",
  "source_extraction_id": "590443c3f99d4bf09846992fd31e3d90",
  "version": 1,
  "memory_type": "entities"
}
-->