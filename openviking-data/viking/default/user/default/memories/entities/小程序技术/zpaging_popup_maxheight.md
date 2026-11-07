# z-paging 放入 uni-popup 弹窗列表空白
苏住房C 小程序中 z-paging 放入自定义 uni-popup 弹窗时列表空白，接口有数据但不显示。

## 问题现象
- 附近小区弹窗内 z-paging 列表接口有数据（Network 能拿到 rows），页面不显示且无报错
- 弹窗容器仅写 max-height 无固定 height，内部 scroll-view 高度撑成 0

## 根因
- 高度链断裂：z-paging 依赖父级确定高度做内部滚动，父容器只有 max-height 导致内部滚动区高度为 0
- 加载时机过早：弹窗动画未结束就调 reload()，容器尺寸未稳，分页算错高度且不自动重算
- 字段名不一致：接口回 projectName，模板读 aroundProjectName，名称空易被误判没数据

## 解决方案
- 弹窗容器改固定 height: 75vh（不用 max-height），补全 z-paging 内部各层高度样式
- 打开后延迟约 300ms 再调 reload() 等动画结束
- 名称字段写多候选映射（projectName / aroundProjectName）
- 补空数据保护避免 res.result 为空抛错；列表区加 v-if="computedList.length" 与空状态逻辑一致

## 验证与归属
- 所属项目：苏住房C
- 来源会话：ad4f1c19-5d85-46dd-94be-7ff09a25a283（2026-07-17）
- 代码基线：d43894b
- 涉及文件：popup.vue、add.vue、search.vue、usePaging.js、transaction.js

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_popup_maxheight",
  "source_extraction_id": "57a3eea8f908476fa5da61782238e5bf",
  "version": 1,
  "memory_type": "entities"
}
-->