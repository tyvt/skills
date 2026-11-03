# benefit页加mock开关排查列表不显示
在 src/pages/benefit/index.vue 增加 USE_MOCK 开关，开启直显模拟数据以排查列表不显示问题源于接口或 z-paging 渲染/样式层。

## 修改内容
- 在 src/pages/benefit/index.vue 增加 USE_MOCK 开关
- 开启后直显模拟数据以排查问题

## 排查目标
- 定位列表不显示问题源于接口或 z-paging 渲染/样式层

## 验证与归属
- 验证证据：src=H5/001.md
- 涉及文件：src/pages/benefit/index.vue
- 来源会话：b3b6701e-0df0-4f87-983e-b6c426eb20fc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_mock_switch",
  "source_extraction_id": "ec014e6704ab4b4c97a1f8eea1e7cab1",
  "version": 1,
  "memory_type": "entities"
}
-->