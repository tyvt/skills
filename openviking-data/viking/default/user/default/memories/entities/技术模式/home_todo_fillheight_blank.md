# 首页待办表fill-height致列间留白
门户首页待办表开启 fill-height 后侧栏收起列宽不均分留白，已修复 syncFillHeight 与监听 sidebar.opened。

## 根因
- 待办表开 fill-height，侧栏收起后内容区变宽但表格高度不变
- syncFillHeight() 在 tableHeight === height 时直接 return，不再跑 doLayout()/列宽均分，导致「发起时间」和「操作」间留白
- 上一轮仅加 ResizeObserver 仍走进 syncFillHeight 提前返回，问题仍在

## 修复要点
- syncFillHeight：高度不变时也调用 doLayout()（专门处理仅宽度变化）
- handleTableResize/handleWindowResize：fill-height 时同步高度后仍 doLayout()，不提前 return
- 监听 sidebar.opened：侧栏切换时立即+动画结束约 320ms 后再布局一次（与 0.28s 过渡对齐）
- app.js：首屏初始化 --sidebar-width，避免侧栏宽度变量未设置

## 涉及文件
- zhi2-web-admin/src/views/home/components/HomeTodoTable.vue
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/index-wrapper.vue
- zhi2-web-admin/src/store/modules/app.js

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：cursor 会话提取；所属项目：门户；来源会话：b25bdc8a-c0a8-4fca-bcff-d85e7e292acd


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_todo_fillheight_blank",
  "source_extraction_id": "6313d7294504464dbdd902f7fd29842d",
  "version": 1,
  "memory_type": "entities"
}
-->