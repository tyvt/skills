# 核验页协议行左对齐修复
苏住房C 项目 `pages_my/verification/FormLocal.vue` 协议 checkbox 行左对齐异常，已修复。

## 问题原因
- 表单 `:label-width="80"` 使无 label 的协议行仍占 80px 标签区，整行右移
- 协议文字用 `position: absolute; left: 28px` 叠在 checkbox 上，布局不稳定

## 修复要点
- 协议行加 `label-width="0"` 取消标签占位，与「姓名」等左边缘对齐
- 用 flex 横向排列 checkbox 与协议文字，去掉绝对定位，与登录页 `AgreementCheck` 布局一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：ff73a0da-4c2f-4e0f-ba3a-30d82fa7c7d6
- 涉及文件：pages_my/verification/FormLocal.vue、styles/form2.scss、components/shared/AgreementCheck.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "checkbox_align_fix",
  "source_extraction_id": "e85e753071284223b9a0af1850f7992a",
  "version": 1,
  "memory_type": "entities"
}
-->