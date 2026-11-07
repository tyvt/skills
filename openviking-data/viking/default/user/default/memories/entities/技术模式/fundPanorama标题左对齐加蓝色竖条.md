# fundPanorama标题左对齐加蓝色竖条

在`fundPanorama/index.vue`中，`.panorama-block__title`与`.chart-wrap__title`改用`display:flex`左对齐，通过`::before`绘制4×16px `#1890ff`竖条（圆角1px，间距8px），移除原`text-align:center`。

**验证证据**：extracted source=cursor session=3bb2b763-7e41-4a6c-893a-450eceb6ab41

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/index.vue、fundPanorama/index.vue

**所属项目**：园区物管2.0
**来源会话**：3bb2b763-7e41-4a6c-893a-450eceb6ab41
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "panorama_title_blue_bar",
  "source_extraction_id": "f5d831b184074ef7877fa2026e807b62",
  "version": 1,
  "memory_type": "entities"
}
-->