# 选择交付楼幢弹窗无数据修复
苏州市房地产监测V3 修复「选择交付楼幢」弹窗无数据问题，根因为响应体解析错误。

## 问题原因
- $post 经拦截器后返回顶层响应体 { code, rows, total } 或 { code, data }，但弹窗只解析 res.data，接口返回 rows 时得到空数组

## 修复内容
- DeliverySelectBuildingDialog.vue：兼容 res.data || res.rows || res.records；楼幢编号映射 buildingNo/buildingCode/buildConstructionNo；公安编号映射 policeNo/buildPoliceNo
- DeliveryScopeSection.vue：用 isProjectDeliveryEditable() 替代 bizState == 0，兼容 PENDING_SUBMIT、0、'0' 等后端返回值
- projectDeliveryConstants.js：新增相关常量

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：0821d863-38ac-4ed7-beee-4276dd8cff11
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：DeliverySelectBuildingDialog.vue、DeliveryScopeSection.vue、projectDeliveryConstants.js、ProjectDeliveryDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "delivery_building_fix",
  "source_extraction_id": "fd721c1979954aee919751d12eaaa0f8",
  "version": 1,
  "memory_type": "entities"
}
-->