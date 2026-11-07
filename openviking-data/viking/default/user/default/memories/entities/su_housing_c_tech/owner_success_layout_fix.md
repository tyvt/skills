
# 业主成功页布局紊乱修复
苏住房C小程序 pages_owner/house/owner/success 页面布局紊乱（按钮文字重叠变形）已修复。

## 问题原因
- SuccessCard 底部按钮区使用 flex + space-between，但 ZsButton 设置了 width:inherit，两个按钮都继承父容器 100% 宽度，在 flex 布局下被挤压到边缘，导致「返回」「继续添加」文字重叠、变形
- 原页面使用不对称 padding: 0 64rpx 0 66rpx，与其他 success 页不一致

## 修复内容
- SuccessCard.vue：用 :deep(.zs-button) 固定按钮尺寸，防止 flex 挤压（flex: 0 0 300...）
- 统一 success 页 padding 与其他页一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：SuccessCard.vue、success.vue、authentication/owner/success.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：500973f3-9d75-48cf-8744-7385f4f59190；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_success_layout_fix",
  "source_extraction_id": "0696f333cb154a068fcf85a0537f1632",
  "version": 1,
  "memory_type": "entities"
}
-->