# 楼幢详情房屋信息区新增同步房屋按钮
园区公共收益项目在楼幢信息详情页「房屋信息」区域右侧新增通用【同步房屋】按钮。

## 修改内容
- 修改文件 `zhi2-web-admin/src/views/building/building/components/houseTable.vue`
- 按钮放在「房屋信息」标题栏右侧、位于「同步权利人」左侧，样式为默认白底蓝字按钮
- 点击后发起 `POST /building/building/importHouseByBuildingCode`，请求体 `{ buildingId: this.buildingId }`
- 接口返回 `code == 200` 时提示「同步房屋成功」并调用 `getList()` 刷新房屋列表
- 按钮权限标识 `building:building:synchronizeHouse`，不显示需在后台菜单/权限配置
- 详情页底部仍保留仅在新吴项目（`xinwu`）下显示的「同步房屋信息」按钮（另一套接口）

## 验证与归属
- 所属项目：园区公共收益；来源会话：41b55088-8b1f-425d-947d-96448d09b77e；代码基线：none
- 涉及文件：`houseTable.vue`、`building/detail.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_house_sync",
  "source_extraction_id": "1dabda6ae60c49ba9b0b0e9ad1f7dc61",
  "version": 1,
  "memory_type": "entities"
}
-->