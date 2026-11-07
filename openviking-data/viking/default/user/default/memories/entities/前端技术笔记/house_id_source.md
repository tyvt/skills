# H5外链houseId来源修复
i淮安公版 H5 外链或带参打开时，维修资金页因 currentHouse 为空一直走「请先选择房屋」，已统一 houseId 解析来源。

## 问题根因
- App.vue 第 52–56 行 H5 启动时仅将 URL 的 houseId 写入 userStore.houseId，未写入 houseStore.currentHouse。
- 维修资金页原只认 useHouseStore.currentHouse 上的 houseId / id，外链或带参打开时 currentHouse 常为空，持续走「请先选择房屋」。

## 修复方案
- 增加 userStore.houseId 作为与 App.vue 一致的来源。
- 增加 onLoad(options) 里的 options.houseId，避免站内 navigateTo(?houseId=) 时只靠 house store 仍拿不到。
- 解析顺序：currentHouse.houseId → currentHouse.id → userStore.houseId → 路由参数 houseId，再判断是否为空。
- 所属小区仍优先用 currentHouse.complexName；若只有 URL 的 houseId 而未在站内选过房，小区名可能为空，此为预期现象（接口仍会按 houseId 拉余额和 ad）。

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安公版
- 涉及文件：App.vue、src/pages_owner/maintain/index.vue、src/store/house.js
- 所属项目：i淮安公版；来源会话 ID：6c60ae7e-b3c8-4c99-89c3-1566ac38e388；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "house_id_source",
  "source_extraction_id": "0c28d5f415194f44b604cfd2092ad894",
  "version": 1,
  "memory_type": "entities"
}
-->