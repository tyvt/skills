# 报修列表遮挡顶部操作区修复
苏住房C「我的-电子业主卡-报事报修」页面列表遮挡顶部搜索、筛选和「前往报事报修」按钮，已修复。

## 问题根因
- z-paging 默认 fixed 全屏定位，列表层叠在顶部搜索、筛选和「前往报事报修」按钮之上

## 修复要点
- pages_owner/repair/index.vue 关闭 z-paging 固定定位：添加 `:fixed="false"`，让列表参与正常文档流
- `.repair-page` 使用 flex 纵向布局，顶部操作区设置 `flex-shrink: 0` 防止被压缩
- `.page-body` 使用 `flex: 1` 和 `min-height: 0`，占满剩余高度并支持滚动

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：pages_owner/repair/index.vue、pages.json
- 来源会话ID：adb68ad1-d25d-4cff-8fc2-1aef22ec90cb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "repair_zpaging_fix",
  "source_extraction_id": "6ad3f2ea4fc04335a74efe9f454748b7",
  "version": 1,
  "memory_type": "entities"
}
-->