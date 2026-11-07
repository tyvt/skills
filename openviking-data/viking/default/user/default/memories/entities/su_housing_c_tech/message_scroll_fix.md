# 苏住房C消息列表滚动修复
消息列表页「管理」和「筛选」原固定顶部，已改为随列表一起滚动，底部操作栏仍固定。

## 问题根因
- 消息列表页 page-top 原先固定在顶部，未与列表处于同一滚动区域

## 修复方案
- 将 page-top 移入 z-paging 内部，与消息列表同滚动区域
- 设置 :fixed="false" 避免 z-paging 使用固定定位
- page-center 用 flex: 1，页面容器 overflow: hidden，由 z-paging 负责滚动
- 底部管理操作栏（全选/设为已读/删除）保持固定底部

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话：bcb98835-f1ec-41eb-9aea-afdbf1871d66
- 涉及文件：src/pages/message/index.vue、src/pages/index/my.vue、src/pages/index/components/My_Suzhufang.vue、src/pages/message/message.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "message_scroll_fix",
  "source_extraction_id": "f36fa3e910da47929bc390966a09b6df",
  "version": 1,
  "memory_type": "entities"
}
-->