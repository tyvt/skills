# 选举页修改按钮居中修复
苏住房C 投票页「我的选举」底部「修改选举」按钮因 flex 横向排列导致宽度收缩、未居中，已在 cursor 会话 e1dc3fb9 修复。

## 问题根因
- 为上下居中加了 `display:flex; align-items:center`，默认横向排列使子元素 BackBtn 按文字收缩宽度，按钮变窄

## 修复方案
- 改为 `flex-direction:column` + `justify-content:center` + `align-items:stretch`
- 通过 `:deep(.btn-container)` 与 `:deep(.zs-button)` 强制 `width:100%`，按钮撑满容器并底部上下居中

## 涉及文件
- src/pages_vote（目录）
- src/pages.json
- src/pages_owner/elect/DecisionResult.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：e1dc3fb9-c043-4801-b13c-330f8468c803；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "vote_btn_center",
  "source_extraction_id": "97382b07988845cbb14e671586e0f5f0",
  "version": 1,
  "memory_type": "entities"
}
-->