# 多页共享 mock 数据收敛到常量模块
园区物管2.0 大屏/统计类页面临时用 mock 顶替接口且多页展示同一套指标时，mock 应统一收敛到公共常量模块，页面只做字段映射。

## 问题根因
- 各页各自写 mock 数组，后续按业务表改数时会漏改某一页，造成两页数字对不上

## 解决方案
- mock 数据统一收敛在公共常量模块（如 mapOverview/constants.js 的 WARNING_STATISTICS_MOCK），其他页面 import 同一份并在 fetch 里映射字段
- 页面级图表 mock 放 mapOverview/mock.js 并用 USE_MOCK_DATA 开关控制；接口就绪时只需切回真实请求

## 验证与归属
- 验证：会话 ed027c4d 中 alert/index.vue 的 fetchStatistics 改为引入 WARNING_STATISTICS_MOCK，constants 调整后 alert 页自动一致
- 涉及文件：alert/index.vue、mapOverview/constants.js、mapOverview/mock.js；所属项目：园区物管2.0；代码基线：fc994977f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shared_mock_constants",
  "source_extraction_id": "080e089d30224d56846c26374eea4472",
  "version": 1,
  "memory_type": "entities"
}
-->