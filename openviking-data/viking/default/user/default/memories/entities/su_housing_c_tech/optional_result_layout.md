# 选项表决决策结果页（optional）布局修复
苏住房C小程序修复 optional/DecisionResult.vue 的两个布局问题，对齐已修好的 common/DecisionResult.vue 实现。

## 空白与签字问题
- 原因：签字用 CardCell 包裹 ZsImage 无固定尺寸，且只取 signature 未兼容 sign 字段
- 修复：签字区改为 cell-item + sign-picture-wrap（153×68px）+ mode="aspectFit"
- 签字取值兼容：recordDetail.signature || recordDetail.sign || detail.signature || detail.sign
- 「决策详情」从整行 CardCell 改为决策内容下方的紧凑链接行
- 决策摘要与「决策详情 >」调整为同一行左右对齐：左侧决策选项摘要，右侧决策详情入口

## 按钮溢出问题
- 原因：BackBtn 自带 margin: 20px 叠加固定底栏后按钮偏右溢出，且缺少 block 属性
- 修复：按钮加 block 属性；底栏容器加 padding: 18px 16（原文截断）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_vote/decision/optional/DecisionResult.vue、src/pages_vote/decision/common/DecisionResult.vue
- 来源会话ID：55bd76cb-6679-4d29-9b33-6cebc5d1203e、30045e67-bafd-468a-a56a-1f3d2ed7b2fe；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "optional_result_layout",
  "source_extraction_id": "0842d2bc9d344262a3fdeea27c8b4603",
  "version": 2,
  "memory_type": "entities"
}
-->