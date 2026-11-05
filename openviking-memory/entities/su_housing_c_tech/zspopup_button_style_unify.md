# ZsPopup弹窗按钮样式统一调整
苏住房C小程序修复退出登录/注销账号等ZsPopup弹窗按钮圆角透出背景色、默认边框未清除的问题。

## 问题根因
- ZsPopup弹窗按钮圆角透出背景色，button::after默认边框层未清除
- 取消/确认按钮存在background-image叠层与zs-button--primary样式冲突

## 修复内容
- ZsPopup.vue用:deep统一收口按钮样式：圆角、背景、overflow:hidden、border:none
- 完整清除button::after默认边框层（display:none !important + border:none !important）
- 取消按钮：纯色#f6f6f6，清除background-image
- 确认按钮：先置background-color:transparent，再单独设置渐变，避免与zs-button--primary叠层
- 删除原先非:deep的.cancel-button/.confirm-button规则
- zs-button.scss中.popup-footer .zs-button补充overflow:hidden、border:none，全局清除::after

## 涉及文件与归属
- 涉及文件：ZsPopup.vue、zs-button.scss、userInfo.vue、cancellationReason.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：91cf8975-4dbd-4908-9479-cbbd3bbf4125；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zspopup_button_style_unify",
  "source_extraction_id": "aded602703eb47bab03dc2c6bb2b83c5",
  "version": 1,
  "memory_type": "entities"
}
-->