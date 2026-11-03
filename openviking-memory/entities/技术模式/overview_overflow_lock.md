# overviewContent多层overflow互锁致内容被遮
园区物管2.0 overviewContent.vue 因多层 overflow 互锁，导致抽屉内容被遮住且无法滚动。

## 问题根因
- 多层 overflow 互锁，导致抽屉内容被遮住
- 内容区域无法滚动

## 修复方案
- overviewContent.vue 设 tabs-wrap 为唯一滚动容器：height: calc(100% - 64px); overflow-y: auto
- 底部固定 64px
- 解除 el-tabs 限高，Tab 头部设 sticky

## 验证与归属
- 验证证据：extracted source=cursor session=4a93808d-0737-4c3c-9c6a-8a77591adac7
- 涉及文件：overviewContent.vue
- 所属项目：园区物管2.0；来源会话ID：4a93808d-0737-4c3c-9c6a-8a77591adac7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "overview_overflow_lock",
  "source_extraction_id": "addfb2f3b8c345c6ab59dedb2975d7b9",
  "version": 1,
  "memory_type": "entities"
}
-->