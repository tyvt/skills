# ZsButton全局virtualHost致mini按钮撑满整行
苏住房C小程序在ZsButton开virtualHost:true使全局窄按钮参与父级flex被撑满，须去掉并在弹窗底栏局部处理。

## 问题现象
- 「选择身份→授权确认」弹窗双按钮不等宽、左钮背景色不生效、位置偏
- 「我的房屋」卡片size="mini"操作钮(完善信息、撤销添加)被拉成整行宽，布局乱

## 根因
- ZsButton组件options开启virtualHost:true，组件级全局生效，小程序按钮真实节点直接参与父级flex
- 叠加.zs-button{width:100%}全局规则，所有窄按钮被撑满父容器，flex收缩对齐随父级变

## 解决方案
- 去掉ZsButton上的virtualHost:true，恢复组件包裹行为
- 弹窗底栏等宽仅在ZsPopup底栏作用域处理：给底栏ZsButton加:style="{width:'100%',display:'flex',minWidth:0}"，配合popup-footer__item/popup-footer-btn类
- 验证顺序：先看房屋卡片按钮恢复，再开弹窗看双钮等宽；同源项目(泰兴/G)出现mini按钮变整行宽优先grep virtualHost

## 验证与归属
- 验证：会话d365c947用户连续4轮反馈弹窗双钮不等宽，最终去掉virtualHost仅底栏加样式修复
- 涉及文件：ZsButton.vue、ZsPopup.vue、authorization.vue、TypeChoose_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：d365c947-62dc-48ad-abbf-b9814a607332；代码基线：48bdb17

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsbutton_virtualhost",
  "source_extraction_id": "c721bf307ccf4950b939d5355989b4a1",
  "version": 1,
  "memory_type": "entities"
}
-->