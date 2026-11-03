# mock_init_decouple
园区物管2.0 数据沙盘/大屏页在 USE_MOCK_DATA=false 时仍因 data() 初始化 cloneMockCards() 导致首屏闪 mock 的修复模式。

## 问题根因
- 即使 USE_MOCK_DATA=false，data() 里用 cloneMockCards() 初始化卡片/图表数据，首屏先渲染整套 mock 数值，接口返回后被覆盖，用户误以为走 mock 或看到错误数据一闪而过
- 初始化与开关脱节，mock 数据未抽离骨架

## 解决方案
- 抽出 createEmptyPanoramaCards() 骨架工厂：保留标题、单位、配色等静态配置，数值置空（summaryValue:0、donutData:[]、barValues 全 0）
- 初始化写 USE_MOCK_DATA ? cloneMockCards() : createEmptyPanoramaCards()，接口模式先展示空/0，仅 true 时完整 mock

## 验证与归属
- 验证：会话 0d12bfa5 用户要求「使用接口时默认不要展示 mock」；结论写明虽 USE_MOCK_DATA=false，data() 仍 cloneMockCards() 导致先显示 mock 再更新
- 涉及文件：assetPanorama/index.vue、assetPanorama/mock.js、fundPanorama/index.vue；所属项目：园区物管2.0；代码基线：6a4835a08

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mock_init_decouple",
  "source_extraction_id": "a1f1b35f47af4915ad79cae6583607ea",
  "version": 1,
  "memory_type": "entities"
}
-->