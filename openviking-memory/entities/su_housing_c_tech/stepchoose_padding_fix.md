# optional/StepChoose.vue 选项内边距布局修复
苏住房C小程序 `optional/StepChoose.vue` 按图2调整选择项内边距，修复高亮背景贴边等问题。

## 问题原因
- 选项 `width: 100%` + `padding` 撑破容器，导致蓝色高亮背景贴边
- 原有 `overflow: hidden` 裁切圆角背景

## 修复内容
- 添加 `box-sizing: border-box` 修复撑破容器
- 选项内边距改为 `padding: 24rpx 28rpx`，与图2一致
- 选项间距 `margin-top: 24rpx`
- 移除 `overflow: hidden` 避免圆角背景被裁切
- 「查看说明」`padding-left` 调整为 `48rpx` 与选项文字左对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 刷新页面后选项呈现为图2：卡片内有留白，选中项圆角浅蓝背景不贴边
- 涉及文件：`optional/StepChoose.vue`、`pages_vote/decision/common/StepChoose.vue`
- 所属项目：苏住房C；来源会话ID：7596f0ef-5187-468b-8b37-d30dd7fc905d；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stepchoose_padding_fix",
  "source_extraction_id": "68876c8622ce424a85240de90cbdd4c6",
  "version": 1,
  "memory_type": "entities"
}
-->