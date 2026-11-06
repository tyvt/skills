# 加梯申请页UI设计稿调整
已按设计稿完成苏住房C小程序加梯申请相关页面的UI样式调整，涉及地图首页与多个表单页。

## 修改内容
- 地图首页（index.vue）：地图改为 fixed 全屏铺满（100vw × 100vh）作为底层背景；搜索栏左右间距改为 12px（margin: 20rpx 12px）
- 申请表单（add.vue / addAlone.vue / input.vue）：页面左右内边距统一为 20px，去掉表单内部多余 40rpx 横向 padding 避免双重间距
- 申请说明字段：标题「申请说明」与输入框同区块，去掉 164rpx 大间距；标题颜色改为 #666666；字数统计保留在输入框内部右下角（沿用 ZsTextarea 组件）
- 提交按钮：三个表单页「提交申请」按钮宽度统一为 330px

## 验证与归属
- 验证证据：extracted source=cursor project=pages_owner_extra
- 涉及文件：地图首页 index.vue；申请表单 add.vue、addAlone.vue、input.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：195edae6-0f6a-4414-80de-36297794ff9a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_ui_adjust",
  "source_extraction_id": "ded0ed38cdde4845819e8eaacaabeb1a",
  "version": 1,
  "memory_type": "entities"
}
-->