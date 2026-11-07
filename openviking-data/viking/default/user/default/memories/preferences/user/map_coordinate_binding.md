
- 项目坐标约定：`xcoor` 实际存储纬度，`ycoor` 存储经度（例如 `xcoor: 33.44`、`ycoor: 119.78`）。
- 地图组件绑定应为 `:lat="form.xcoor"`、`:lng="form.ycoor"`、`:address="form.address"`。
- 移除无效的 `:xcoor`/`:ycoor` 属性，统一改为 `:lat`/`:lng`，并统一引用 `projectinfo` 组件。
- 修复文件：`customerProjectinfo/BaseProjectForm.vue`、`customerProjectinfo/changeDetail.vue`（改用 `:lat`/`:lng` 并统一引用）、`propertyProject/detail.vue`、`propertychange/detail.vue`（补充 `:address`/`:lat`/`:lng`）、`buildland/detail.vue`（补充 `:address`）。
- 外部传入经纬度和坐落时，打开地图应默认定位到对应位置。
- 适用于兴化物管 zhi1-web-admin 项目。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "map_coordinate_binding",
  "source_extraction_id": "adc485e9091141abb2f104e13b56d0c6",
  "version": 2,
  "memory_type": "preferences"
}
-->