# ZsButton 全宽需 block 属性
苏住房C 的 addHouseContract 页底部「添加」按钮因未设 block 且父级 flex 居中，显示成贴中间的窄条而非整行圆角按钮。

## 问题根因
- 页面根 .page 用 display:flex; align-items:center，子元素被水平居中并收缩到内容宽度
- ZsButton 未传 block，组件默认非全宽；模板写的 class="long" 在 SCSS 中无对应样式（项目无 .long），完全不起作用，易被误判为「样式写了没生效」

## 解决方案
- 给 ZsButton 加 block 属性（组件内置全宽样式），删除无效的 long 类
- 必要时给所在容器 .button 补 width:100% 对抗父级 flex 居中收缩
- 推广：本项目按钮全宽一律用 ZsButton 的 block，不自造 long/full/btn-block 之类类名；排查「按钮变窄」先看父容器是否为 flex + align-items:center

## 验证与归属
- 验证：会话 af4e72e7，基线 b7bf813；addHouseContract「添加」按钮异常，改法为加 block、移除 long、.button 补 width:100%
- 涉及文件：src/pages_owner/house/owner/addHouseContract.vue、src/components/ZsButton/ZsButton.vue、src/pages_owner/house/owner/addHouse.vue、src/styles/form2.scss
- 所属项目：苏住房C；来源会话ID：af4e72e7-03c6-4e90-a546-a36ef38a5c56；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_block",
  "source_extraction_id": "f684d63a5e0143f29d14a1b71d05f06a",
  "version": 1,
  "memory_type": "entities"
}
-->