# 楼幢信息空数据提示改为纯文本不穿透
产品2.0 公共查询-物业管理区域详情页的楼幢信息空数据提示已由可点击链接改为纯文本，不再穿透跳转。

## 变更内容
- 空数据提示由可点击「物业管理区域备案」链接改为纯文本：「暂无数据，请先到物业管理区域详情页维护授权的楼幢范围」
- 移除 `OverviewEmptyTip` 组件及 `goEmptyFiling` 跳转逻辑，空状态不再可点击穿透
- 右上角「物业管理区域详情》」按钮保留，用户仍可主动进入详情页维护
- 样式沿用原有 `overview-empty-tip` 类，视觉一致

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/detail.vue、zhi2-web-admin/src/views/publicQuery/complex/components/buildingTable.vue、zhi2-web-admin/src/views/publicQuery/complex/components/OverviewEmptyTip.vue
- 所属项目：产品2.0；来源会话：b5037f07-6db9-4962-b4ff-c907c3a62fea；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_empty_tip",
  "source_extraction_id": "f665265909c84349965a107959cf0fa9",
  "version": 1,
  "memory_type": "entities"
}
-->
