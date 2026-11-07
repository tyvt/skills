# 公共BackBtn自带margin导致固定底栏按钮溢出
苏住房C小程序投票决策结果页底部「修改决策」按钮偏右、溢出容器、不居中，根因为公共BackBtn组件自带margin:20px叠加底栏padding。

## 问题现象
- 投票决策结果页底部「修改决策」按钮偏右、溢出容器、不居中
- 同类问题在泰兴项目表现为「页脚按钮错位」
- 按钮无 block 属性，宽度按内容收缩，flex 对齐也无法居中

## 根因
- 公共组件 BackBtn 自身带 margin:20px，放入已设左右内边距的固定底栏后，左 margin 与底栏 padding 叠加，右侧被挤出可视区
- 按钮没有 block 属性，宽度按内容收缩

## 解决方案
- 按钮补 block 属性撑满容器宽度，水平居中由容器决定
- 底栏容器写 padding:18px 16px 且显式 box-sizing:border-box，防止 padding 撑出屏外
- 用 :deep(.btn-container) 把 BackBtn 自带的 margin 清零（清外部盒模型而非改内部视觉）
- 底栏配合安全区，避免小屏机型按钮被手势条压住

## 验证与归属
- 验证会话 55bd76cb（2026-08-28，基线 8fc3cc5）用户报「底部修改决策按钮溢出未居中」
- 涉及文件：pages_vote/decision/components/BackBtn.vue、DecisionResult.vue、DecisionRecord.vue、styles/page.scss
- 所属项目：苏住房C；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "backbtn_margin_overflow",
  "source_extraction_id": "ceeab5991c4441bf91972f5b0aa75c6e",
  "version": 1,
  "memory_type": "entities"
}
-->