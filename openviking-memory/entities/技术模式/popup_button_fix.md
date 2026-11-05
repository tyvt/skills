# 授权确认弹窗双按钮样式修复
苏住房C小程序因 ZsButton 开启 virtualHost 导致按钮布局错乱，已移除全局属性并单独处理弹窗。

## 问题根因
- ZsButton 开启 virtualHost:true 全局生效，按钮直接参与父级 flex
- 叠加 .zs-button{width:100%} 全局规则，列表里 size="mini" 操作钮被拉成整行宽，布局混乱

## 修复内容
- 去掉 ZsButton 的 virtualHost:true，其它页面按钮恢复组件包裹行为
- 弹窗底栏 ZsPopup 给 ZsButton 加 style 宽度100%等，配合 popup-footer 不影响列表页

## 涉及文件与归属
- 涉及文件：TypeChoose_Suzhufang.vue、addTypeChoose.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d365c947-62dc-48ad-abbf-b9814a607332；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_button_fix",
  "source_extraction_id": "7abc9171dfa941c6b2fe9174722cd6ca",
  "version": 1,
  "memory_type": "entities"
}
-->