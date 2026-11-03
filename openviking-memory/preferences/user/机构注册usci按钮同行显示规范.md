- 在 `Step1BasicInfo.vue` 将按钮包入 `.action-buttons`，容器设 `flex-wrap: nowrap`、输入框 `flex:1 1 19ch; min-width:0`、按钮组 `flex-shrink:0`，使 USCI 按钮与输入框同行显示。
- 在 `register-layout.spec.js` 调整 `minUsciWidth` 为 180 并新增同行断言。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "机构注册USCI按钮同行显示规范",
  "source_extraction_id": "546275cea60345d0accb2c916598cd00",
  "version": 1,
  "memory_type": "preferences"
}
-->