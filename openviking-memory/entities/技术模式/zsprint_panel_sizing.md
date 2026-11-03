# 全局打印下拉框尺寸自适应
苏住房G 全局打印组件 ZsPrint 因 min-height 定高+绝对定位按钮导致多模板选择面板留白失控，改流式+max-content 自适应。
## 问题根因
- 面板写 min-height:316px，选项少也强制占高。
- 底部取消/打印按钮绝对定位脱离文档流，面板高度靠 min-height 兜住，按钮上方留死白。
- 宽度无约束，长标签换行或撑歪。
## 解决方案
- 移除 min-height:316px 让高度随选项数自适应。
- 底部按钮改流式布局（margin-top:12px; text-align:right）参与高度计算。
- 宽度改 width:max-content 贴合内容；复选框 min-width:320px 且标签 white-space:nowrap 防长选项换行。
- 内边距 20px 收紧到 16px 20px。
## 验证与归属
- 验证证据：会话 39c03414「调整打印开户通知书下拉框的大小」→ 移除 min-height、页脚流式、width:max-content、复选框 min-width 320px+nowrap、padding 调整，ESLint 通过。
- 涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\components\ZsPrint\index.vue
- 所属项目：苏住房G；来源会话ID：39c03414-b2a2-4561-aea2-41694b1b520b；代码基线：3c282a5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsprint_panel_sizing",
  "source_extraction_id": "9af2f036baf34743bd6ba71eed958267",
  "version": 1,
  "memory_type": "entities"
}
-->