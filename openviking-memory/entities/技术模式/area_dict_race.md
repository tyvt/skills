# B端默认小区街道/社区反查为空
园区物管2.0 中 B 端新增页带默认小区进入时，街道、社区字段因字典异步加载竞态与提前 return 而缺失。

## 问题根因
- initDict 里立刻执行 initCurrentProject（请求 /property/complex/{projectId} 后调 applyPropertyProjectRow），街道/社区名称靠 area mixin 的 getSubdistrictNameByCode / getCommunityNameByCode 从字典反查。
- 该字典在 created 里异步加载，反查执行时字典仍为空，拿到 undefined。
- 原逻辑若 form.projectId 已有值（如 session 缓存）就直接 return，即使街道/社区为空也不再补全。

## 解决方案
- 新增 syncSubdistrictCommunityFromCodes：字典未就绪时用 $watch 等待字典加载完成后再写入名称。
- 调整 initCurrentProject：缺少街道/社区时用当前或默认 projectId 重新拉取小区补全，而非提前 return。
- 凡使用 initCurrentProject + area mixin 反查的页面（pubQuarterlyDeclaration 等）按同方式处理。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：027.md 会话 6e97f2b9 最终结论确认竞态与提前 return 问题及两处修改。
- 涉及文件：src/views/benefit/pubParkingRate/detail.vue、src/mixins/area.js。
- 所属项目：园区物管2.0；来源会话 6e97f2b9-b0d9-4363-889e-533667c5bbef；代码基线 3965548b6。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_dict_race",
  "source_extraction_id": "26ebdf939fa549b983bffd11ad0ba2a0",
  "version": 1,
  "memory_type": "entities"
}
-->