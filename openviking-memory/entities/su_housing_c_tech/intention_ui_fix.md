# 我的求购列表UI紊乱修复
苏住房C小程序「我的 → 我的求购」列表UI紊乱已修复，涉及 pages_transaction/intention/my.vue。

## 问题原因
- `z-paging` 默认全屏固定定位，搜索栏、筛选与列表同页但未设 `:fixed="false"`，列表层覆盖顶部区域导致搜索框与「添加」按钮叠在卡片间
- 搜索框用 `w-full`（100%宽度）与「添加」按钮同行 flex，两者互相挤压重叠

## 修复内容
- 为 `z-paging` 添加 `:fixed="false"`，用 flex 布局让列表在顶部内容下方正常占位滚动
- 页面容器改为 `height: 100vh` 纵向 flex 布局（与二手房列表页一致）
- 搜索框在有「添加」按钮时改为 `flex-1 min-w-0`，按钮加 `flex-shrink-0` 避免横向挤压

## 验证与归属
- 顶部 banner、搜索栏、筛选固定上方，列表下方独立滚动不再层叠错乱
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_transaction/intention/my.vue`
- 来源会话ID：31d82de8-28b1-42cc-8741-623368194dca；代码基线none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "intention_ui_fix",
  "source_extraction_id": "7bbfec6e00654c00b561e884e8122dfc",
  "version": 1,
  "memory_type": "entities"
}
-->