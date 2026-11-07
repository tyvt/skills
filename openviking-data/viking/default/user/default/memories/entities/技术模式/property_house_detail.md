# 物业用房验收详情改 DetailTemplate（苏住房G）
苏住房G 项目 propertyHouseAcceptance/detail.vue 参考确认页改用 DetailTemplate 展示查看模式。

## 改动说明
- 查看模式（formMode == 'view'）使用 <DetailTemplate :data="contentInfo" />，由 detailMixins 全局混入提供
- 编辑/新增：原表单项放进 <template v-else>，逻辑不变
- 小区名统一由 DetailTemplate 的 type: 'link' 处理，编辑侧只保留带选择弹窗的 zs-input
- contentInfo 描述只读字段：业务单号/地址 text、行政区域用 dictFormatter、面积 amount（unit: '㎡'、dot: 3）、交付日期 datetime、概况/说明/计划 textarea、物业管理区域 link

## 涉及文件
- zhi2-web-admin/src/views/property/propertyHouseAcceptance/detail.vue
- zhi2-web-admin/src/views/property/propertyManagementHouseConfirm/detail.vue
- zhi2-web-admin/src/components/detail-template/detail-template.vue

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：9a51860c-2a78-447c-94d7-d41c091ecd89

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_house_detail",
  "source_extraction_id": "3ed1418d03ae4a378ef623cde6769cc3",
  "version": 1,
  "memory_type": "entities"
}
-->