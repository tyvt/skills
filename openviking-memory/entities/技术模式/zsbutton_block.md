# ZsButton 全宽需 block 属性
苏住房C 的 addHouseContract 页底部「添加」按钮因未设 block 且父级 flex 居中，显示成贴中间的窄条而非整行圆角按钮。

## 问题根因
- 页面根 .page 用 display:flex; align-items:center，子元素被水平居中并收缩到内容宽度
- ZsButton 未传 block，组件默认非全宽；模板写的 class="long" 在 SCSS 中无对应样式（项目无 .long），完全不起作用，易被误判为「样式写了没生效」
- 自定义组件标签上的 class 不会透传到组件内部真实节点（除组件显式接收），在外部写宽度类本来就不可靠
- 会话76068bd5补充：ZsButton 默认 width:inherit 在父容器 flex+align-items:center 下收缩成文字宽

## 解决方案
- 给 ZsButton 加 block 属性（组件内置全宽样式），删除无效的 long 类
- 必要时给所在容器 .button 补 width:100% 对抗父级 flex 居中收缩
- 推广：本项目按钮全宽一律用 ZsButton 的 block，不自造 long/full/btn-block 之类类名；排查「按钮变窄」先看父容器是否为 flex + align-items:center
- ZsButton.vue 实现上移除 width:inherit，新增 block 属性绑 zs-button--block 类，round 属性改绑 zs-button--round 类，宽度由显式 prop 表达

## 验证与归属
- 验证：会话 af4e72e7，基线 b7bf813；addHouseContract「添加」按钮异常，改法为加 block、移除 long、.button 补 width:100%
- 涉及文件：src/pages_owner/house/owner/addHouseContract.vue、src/components/ZsButton/ZsButton.vue、src/pages_owner/house/owner/addHouse.vue、src/styles/form2.scss
- 所属项目：苏住房C；来源会话ID：af4e72e7-03c6-4e90-a546-a36ef38a5c56、064ec0fb-85a5-4024-bd90-76afedcd4945、76068bd5；代码基线：b7bf813、f1939b0、5f0f4dc
- 验证：会话 064ec0fb（2026-08-27，基线 f1939b0）房屋详情页「撤销添加」按钮宽度不对，class="button long" 的 .long 样式不存在，ZsButton 默认按文字宽度收缩，改为使用 block 属性占满整行
- 涉及文件：src/pages_owner/house/detail.vue、src/components/ZsButton/ZsButton.vue、src/pages_owner/house/owner/detail.vue、src/pages_owner/house/owner/add.vue
- 验证：会话 76068bd5（基线 5f0f4dc）用户「按钮宽度不对，全局核查修复」，根因 width:inherit 收缩与 .long scoped 不命中，修复为 ZsButton.vue 移除 width:inherit、新增 block 属性、round 绑类，uni.scss 增加四条满宽规则；涉及 pages_my/verification/FormManual.vue、pages_owner/house/owner/manual.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_block",
  "source_extraction_id": "dca35173571046008ab4d13a3f707715",
  "version": 2,
  "memory_type": "entities"
}
-->