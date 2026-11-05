# 手机号授权弹窗 UI 调整
苏住房C 小程序完成 WechatPhoneAuthPopup.vue 的 UI 调整，对齐设计稿标注。

## 间距调整
- 弹窗顶部内边距：28px → 24px
- 图标到标题：16px → 8px
- 标题到说明文案：12px → 24px

## 图标与文案
- 移除固定 72×72 容器，避免图标下方额外空白
- 图标显示尺寸：40px → 49px（对应 98×98 素材一半）
- 标题、说明文案 text-align: center；权益列表保持 width:100% 左对齐
- 业务逻辑、按钮样式、遮罩与授权交互均未改动

## 验证与归属
- 登录页（pages_main/login/index）和「我的」页自动使用更新后弹窗样式
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/shared/WechatPhoneAuthPopup.vue
- 来源会话ID：fc2a8c5e-bff6-4e3d-a36d-309db1a4029c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "phone_popup_ui_fix",
  "source_extraction_id": "87e33cf0079f4bbcb47a8d1b6a3d7a99",
  "version": 1,
  "memory_type": "entities"
}
-->