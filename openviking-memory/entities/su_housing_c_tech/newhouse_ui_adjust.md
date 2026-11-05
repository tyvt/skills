# 新房与筛选弹窗UI调整
苏住房C小程序完成了新房间距、筛选重置图标及两智一全页面的多处UI调整与修复。

## 调整内容
- 新房/户型集锦/最新楼盘/在售楼盘页面 `.page-top` 与 `.house-list` 左右 padding 由 23px 改为 12px。
- 筛选弹窗 `conditionScreening.vue` 因重复 `data()` 覆盖导致重置图标丢失，且 `reset.png` 不存在；改为移除重复 data() 并用 `ZsImage` 加载新建 `images/szf/reset.svg`，footer 改 flex 布局。
- 两智一全页面搜索框间距 20px、项目图片加 `border-radius:8px`、分割线左右留 20px。
- 两智一全列表项 `goodProject/index.vue` 原用 `px-32` 不生效（UnoCSS 水平内边距类名为 `p-x-32`，见 `uno.config.ts`），改为 `p-x-32` 后列表左右各留 32rpx 间距，与搜索栏区域一致。

## 涉及文件与归属
- 涉及文件：newHouse/index.vue、newHouse/houseTypeList.vue、newHouse/indexMore.vue、conditionScreening.vue、pages_transaction/goodProject/index.vue。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：efe288e0-e72c-42af-848b-9bb1cbfc98d8。

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_ui_adjust",
  "source_extraction_id": "866134d92a3c4feeab6c08d36b806b01",
  "version": 2,
  "memory_type": "entities"
}
-->