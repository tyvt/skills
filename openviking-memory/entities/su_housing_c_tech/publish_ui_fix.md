# 发布房源角色选择页UI调整
苏住房C小程序 `pages_transaction/publishHouse/type.vue`（选择发布角色页）完成三处 UI 调整。

## 修改内容
- 权证类型下方分割线：引入 `form2.scss`，为最后一个表单项补底部分割线，与其他行一致
- 左侧图标：将 `ZsImage` 加 `tip-img` 类设固定宽高 28rpx，指定 `subpackage="pages_transaction"` 加载 `yiwen.png`，设 `mode="aspectFit"`
- 按钮上方间距 +40px：「下一步」按钮 `margin-top` 从 80rpx 调整为 160rpx

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 需在「首页 → 我要卖房 → 选择发布角色」页面验证
- 涉及文件：type.vue、form2.scss、pages_owner/house/owner/authentication.vue
- 所属项目：苏住房C；来源会话ID：0a834aef-a81b-437e-98de-264832c5f82e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "publish_ui_fix",
  "source_extraction_id": "aba249f47836403c914050f6abb992f1",
  "version": 1,
  "memory_type": "entities"
}
-->