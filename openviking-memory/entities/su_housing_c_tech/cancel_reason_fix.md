# 账户注销页其他原因输入框偏移修复
苏住房C小程序注销原因页「其他原因」输入框因多余 margin 向右溢出，已去除使其对齐。

## 问题根因
- `.other-reason-section` 同时设 `width:100%` 与 `margin-left:24px`，父容器已有 `padding:20px`，输入框向右溢出显偏右。

## 修复方案
- 去掉 `margin-left:24px`，输入框与「请选择注销原因」标题及「提交」按钮同宽对齐。

## 验证与归属
- 涉及文件：pages_my/setting/cancellationReason.vue、components/ZsTextarea/ZsTextarea.vue、pages_feedback/feedback/add_feedback.vue。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：eb56a9b9-d956-416b-b204-677b8008eb20。

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "cancel_reason_fix",
  "source_extraction_id": "642a3b3d95c0467b8362de733a2cb85a",
  "version": 1,
  "memory_type": "entities"
}
-->