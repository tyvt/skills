# 报修提交页房屋选择重置修复
苏住房C 小程序「我要报修-共用部分-所在房屋」在切换房屋后返回会被自动重置，已修复。

## 问题原因
- 报修提交页 `submit.vue` 每次 `onShow` 都调用 `getHouseList()` 重新加载房屋列表
- 按优先级自动重置：1. `userStore.houseId`（默认房屋 A） 2. 当前小区房屋 3. 列表第一项
- 用户从 A 切到 B，点「报修设施设备」进入选择页，返回触发 `onShow` 导致房屋被重置回 A

## 修复内容
- `getHouseList()` 增加判断：若 `form.house` 已有值（用户已手动选择），保留该选择，不再执行默认房屋逻辑
- 在 `submit.vue` 第 228-240 行实现 `form.house` 存在时查找并保留 `selectedHouse`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`zhi2-mobile-shimin/src/pages_owner_extra/repair/submit.vue`
- 来源会话ID：f5c3361f-ac2a-43fa-8586-7a2d7934e203
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "repair_house_reset_fix",
  "source_extraction_id": "9e1222fc5f614dea9c5ae5cd01eb602c",
  "version": 1,
  "memory_type": "entities"
}
-->