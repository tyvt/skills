# benefit模块移除mock分支
i淮安H5 的 benefit 模块移除 mock 分支，列表与小区均走真实接口。

## 修改内容
- 在 src/pages_benefit/benefit/index.vue 移除 useBenefitMock、MOCK_QUARTERS 等 mock 分支
- 移除 getList/onShow 内 mock 逻辑
- env.development 删除 VITE_BENEFIT_MOCK，列表与小区走真实接口

## 保留逻辑
- 保留 zs-picker-popup 的 findIndex/空列表修复
- 保留单小区 showPicker 的 toast 等非 mock 逻辑

## 验证与归属
- 验证：src=i淮安H5/001.md
- 涉及文件：src/pages_benefit/benefit/index.vue、src/pages_benefit/assetsPublicity/index.vue、src/pages.json、src/hooks/useLoadMore.js、package.json、node_modules/@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue、src/api/benefit.js、src/store/user.js
- 所属项目：i淮安H5；来源会话：472544ee-238b-483c-9e2d-72850c506abd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_remove_mock",
  "source_extraction_id": "9505a034bcf340cb94beac01c0553352",
  "version": 1,
  "memory_type": "entities"
}
-->