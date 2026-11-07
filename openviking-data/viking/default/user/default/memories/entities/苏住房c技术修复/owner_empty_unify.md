# 业主分包空页面样式统一
苏住房C小程序业主分包的街道信息、社区信息页已统一为空数据时显示 ZsEmpty 缺省样式。

## 问题背景
- 项目中原有两种空页面样式：样式A无数据仍渲染模块字段显示「-」；样式B无数据显示 ZsEmpty 缺省图与「暂无数据」
- 目标样式为样式B，参考业委会信息页实现

## 修改内容
- 参照 pages_owner_extra/committee/info/index.vue（业委会信息页）实现
- 更新 pages_owner/subdistrict/info/index.vue（街道信息）与 pages_owner/community/info/index.vue（社区信息）
- 核心改动：用 v-if="detailInfo.name" 控制有数据展示详情，无数据显示 <ZsEmpty v-else />

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：committee/info、subdistrict/info、community/info 三个 index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：ef21dfdb-fbbc-4ce0-8b23-8c2aadf81301；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "owner_empty_unify",
  "source_extraction_id": "19ec049c4e274a508f21594b339261a7",
  "version": 1,
  "memory_type": "entities"
}
-->