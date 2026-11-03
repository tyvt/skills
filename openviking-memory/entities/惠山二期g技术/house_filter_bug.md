# 房屋变更未选项目致楼幢查询无过滤
惠山二期G zhi2-web-admin 房屋变更页未先选项目时楼幢弹窗返回全部楼幢的缺陷与修复。

## 问题根因
- zhi2-web-admin/src/views/building/houseChange/detail.vue 中楼幢弹窗 filterParams.projectId 未选项目时为 undefined
- 后端因缺 projectId 返回全部楼幢，缺少项目维度过滤

## 修复方案
- openBuildingDialog 无 projectId 时提示并 return
- openUnitDialog 增加 buildingId 校验及 filterParams.buildingId
- setProject 切换时清空残留，保留 UI :disabled 双重保险

## 验证与归属
- 验证证据：src=惠山二期G/013.md
- 涉及文件：zhi2-web-admin/src/views/building/houseChange/detail.vue、zhi2-web-admin/src/views/building/buildingChange/detail.vue
- 所属项目：惠山二期G；来源会话：11ad0957-fe32-4048-b697-514a71caef0a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "house_filter_bug",
  "source_extraction_id": "199894fef6144ee28cf97b4077472d75",
  "version": 1,
  "memory_type": "entities"
}
-->