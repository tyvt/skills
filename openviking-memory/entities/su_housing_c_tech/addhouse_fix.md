# addHouse.vue 问号弹窗与 placeholder 样式修复
苏住房C 小程序 addHouse.vue 修复问号图标弹窗不显示与 placeholder 样式不一致两个问题。

## 问题原因
- 房屋所有权证号 `?` 图标绑定 `instructionsOpen` 跳转跨分包页面易失败，且页面内 uni-popup 说明弹窗未使用
- 证号输入框 placeholder 原为 `28rpx / #999`，与区域选择器 `32rpx / #CCCCCC` 不一致

## 修复方式
- 统一改为 `openInstructions()` 调用 `popup.open()` 打开页内说明弹窗，用 `@tap.stop` 包裹图标避免 ZsImage 吞点击
- 修复「我已知晓」按钮 `$refs.popup.close()` 在 script setup 中无效的问题
- 证号输入框改用 `placeholder-class="uni-easyinput__placeholder-class"` 并补充对应样式

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_owner/house/owner/addHouse.vue`、`src/pages_transaction/publishHouse/verification.vue`
- 来源会话ID：7bc1d9ba-8faa-4839-9f70-f4939f0e1403

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "addhouse_fix",
  "source_extraction_id": "ae26486ba9aa4613a958cec2e7fe24fa",
  "version": 1,
  "memory_type": "entities"
}
-->