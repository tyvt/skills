# B 端新增表单默认填充物业管理区域
园区物管2.0 中 benefit 模块申报/备案类详情页（pubManagementOrg、pubParkingRate、pubQuarterlyDeclaration 等）新增表单自动带入物业管理区域的可复制套路。

## 问题背景
- B 端用户顶部已选好「物业管理区域」，进入新增表单应自动带入，不让用户再手动弹窗选择。
- 小区接口返回的 row.subdistrict / row.community 本身是编码，前端若用 getSubdistrictNameByCode / getCommunityNameByCode 转名称赋值，提交时街道社区字段变名称而非代码，后端对不上。

## 解决方案
- 抽 initCurrentProject()（新增模式用 store 的 currentProjectId 请求 /property/complex/{id} 取区域信息）与 applyPropertyProjectRow()（统一处理字段赋值，街道/社区直接赋接口返回编码，不做名称转换）。
- showPropertyProjectDialog() 在 B 端（isBTerminal）直接 return 不弹选择框。
- 字段转名称依赖删掉后，waitForAreaOptions（等街道社区字典加载）随之移除，减少无谓字典等待。
- 默认小区与手动选择小区两条链路必须走同一套赋值逻辑，避免提交体不一致。

## 验证与归属
- 验证：会话 2e908be5 applyPropertyProjectRow 直接赋 row.subdistrict/community 编码、去掉名称转换与 waitForAreaOptions；会话 82479c58 pubParkingRate/pubQuarterlyDeclaration 按 pubManagementOrg 模式补齐 isBTerminal + initCurrentProject + applyPropertyProjectRow + showPropertyProjectDialog 四件套。
- 涉及文件：zhi2-web-admin/src/views/benefit/pubManagementOrg/detail.vue、pubParkingRate/detail.vue、pubQuarterlyDeclaration/detail.vue、zhi2-web-admin/src/mixins/area.js；所属项目：园区物管2.0；来源会话：2e908be5-90f0-4ee1-998f-327c7c2fb67b、82479c58-f984-4f4d-8b85-c7a042ecea51；代码基线：55cd8653c / 7fe15a8cb / 8f4427ecd / f101dd464 / b2b559778。

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "b_terminal_form_autofill",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 2,
  "memory_type": "entities"
}
-->