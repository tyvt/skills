# benefit页加mock开关排查列表不显示
在 src/pages/benefit/index.vue 增加 USE_MOCK 开关，开启直显模拟数据以排查列表不显示问题源于接口或 z-paging 渲染/样式层。

## 修改内容
- 在 src/pages/benefit/index.vue 增加 USE_MOCK 开关（const USE_MOCK = false 改为 true 开启）
- 开启后直接显示 12 条模拟数据（不走接口）；改回 false 恢复走真实接口
- 开启 mock 仍不显示，说明问题在 z-paging 渲染/样式层（容器高度、slot/滚动区域、组件版本配置）
- mock 能显示而接口不显示，则把 res.rows 兼容成 res.data.rows / res.data.list 等返回结构

## 排查目标
- 定位列表不显示问题源于接口或 z-paging 渲染/样式层

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：src/pages/benefit/index.vue
- 来源会话：b3b6701e-0df0-4f87-983e-b6c426eb20fc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_mock_switch",
  "source_extraction_id": "a406d3eb4867402c8b60531599883674",
  "version": 2,
  "memory_type": "entities"
}
-->