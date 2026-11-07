# 房屋变更页楼幢单元选择缺失项目信息修复
修复房屋信息变更详情页因缺 `projectId` 导致点楼幢/单元弹“请先选择开发项目”的问题。

## 问题根因
- 从房屋信息跳转变更页（`formMode:'add'`）时接口 `/building/house/{houseId}` 返回数据只带 `projectName` 缺 `projectId`
- 点击楼幢/单元选择框时 `openBuildingDialog`/`openUnitDialog` 校验 `form.projectId` 不存在而弹窗

## 修复方案
- 新增 `backfillProjectInfo()` 方法，在新增模式加载房屋数据后、编辑模式 `detailCallback` 后调用
- 有 `buildingId` → 请求 `/building/building/{buildingId}` 取回 `projectId/projectName/projectCode` 回填，补齐 `buildingNo/buildingCode`
- 无 `buildingId` 但有 `u` 开头关联信息时亦做对应回填（源会话原文截断）

## 项目与验证
- 所属项目：惠山二期G
- 来源会话：9c47b930-1e4a-454a-bb8b-450970d0136c
- 涉及文件：`zhi2-web-admin/src/views/building/houseChange/detail.vue`、`zhi2-web-admin/src/views/building/house/detail.vue`、`zhi2-web-admin/src/views/building/buildingTable/index.vue`
- 验证证据：src=惠山二期G/012.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_backfill",
  "source_extraction_id": "8280b5a305984951910eb7df99f705d7",
  "version": 2,
  "memory_type": "entities"
}
-->