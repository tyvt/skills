# ZsButton的long/block类名无对应样式
苏住房C 人工添加页底部提交按钮因父容器 align-items:center 且 long 类未定义，只按文字宽度撑开，需在组件内补 .zs-button--block{width:100%} 并改 stretch。

## 问题现象
- 人工添加页底部「提交人工审核」按钮宽度只到文字宽度，缩在左边一小截
- 页面模板写了 long 类、父容器纵向 flex，但按钮既不铺满也不居中
- ZsButton 的 block 属性同样因缺 .zs-button--block 规则不生效

## 根因
- 父容器用 align-items:center 覆盖默认 stretch，flex 交叉轴对齐后子项只按内容宽度撑开
- 模板 long 类在项目样式中无定义，属无效类名不报错
- 组件内原本没有 .zs-button--block 规则，传 block 属性不生效

## 解决方案
- 父容器由 align-items:center 改为 align-items:stretch
- 按钮改用 ZsButton 的 block 属性，并在 components/ZsButton/ZsButton.vue 补 .zs-button--block { width:100% } 让类名有真实样式
- 给 ZsButton 传类名/属性前先确认修饰类在组件样式确实存在，遇「样式不生效」优先核对类名再疑权重
- 修复落 ZsButton 组件层，其他写 block 的按钮一并生效

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 3f889ff2（基线 5f0f4dc）用户报「按钮宽度太窄」
- 涉及文件：components/ZsButton/ZsButton.vue、pages_owner/house/owner/manual.vue
- 所属项目：苏住房C；来源会话ID：3f889ff2-2daa-476e-86b3-963833ee9ca2；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_block_style",
  "source_extraction_id": "ed684869517947daa729ceb5239a72e0",
  "version": 1,
  "memory_type": "entities"
}
-->