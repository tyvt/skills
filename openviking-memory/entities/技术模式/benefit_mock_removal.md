# 移除benefit模块mock逻辑
i淮安H5 项目中对 benefit 相关页面移除 mock 分支，改走真实接口。

## 修改内容
- 在 src/pages_benefit/benefit/index.vue 去掉 useBenefitMock、MOCK_QUARTERS、MOCK_COMPLEX_LIST、MOCK_DECLARATIONS 及 getList/getProjectList/onShow 里所有 mock 分支
- 列表与小区仍走真实接口
- .env.development 删除 VITE_BENEFIT_MOCK 及相关注释

## 保留逻辑
- showPicker 在仅有一个小区时的 toast
- mapComplexToPicker 与 String 比较当前小区
- zs-picker-popup 里对 findIndex/空列表的修复（与 mock 无关）

## 验证与归属
- 涉及文件：src/pages_benefit/benefit/index.vue、src/pages_benefit/assetsPublicity/index.vue、src/pages.json、src/hooks/useLoadMore.js 等
- 所属项目：i淮安H5；来源会话：472544ee-238b-483c-9e2d-72850c506abd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_mock_removal",
  "source_extraction_id": "39b0dbebf07c42e1b9eae62b778a900a",
  "version": 1,
  "memory_type": "entities"
}
-->