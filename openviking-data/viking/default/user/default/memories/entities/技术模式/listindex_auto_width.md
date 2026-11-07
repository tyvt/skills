# ListIndex.vue auto 列致列表宽度不一
苏住房C 移动端 `ListIndex.vue` 无预览图时使用 `grid-template-columns: auto 1fr`，文字落入 `auto` 列使卡片宽度随标题变化。

## 问题根因
- 无预览图时网格 `auto 1fr` 中文字落入 `auto` 列
- 卡片宽度随标题长度变化，列表不齐

## 修复要点
- 改为 flex 布局，卡片设 `width: 100%` 占满容器
- `.right-text` 设 `flex: 1; min-width: 0` 限制最小宽度，文字区域自适应剩余空间
- 有预览图时图片用 `flex-shrink: 0` 保持固定尺寸
- `onlineService/index.vue` 的 `.content` 的 `align-items` 改为 `stretch` 统一宽度

## 涉及文件
- src/pages_my/onlineService/index.vue
- src/components/article/ListIndex.vue
- src/components/article/ListDetail.vue
- src/components/commonNew/baseCard.vue
- src/pages/index/components/PolicyList.vue
- src/pages_tab/components/PolicyList.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：e687f92b-2bae-4027-9337-1e29dfe49948
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listindex_auto_width",
  "source_extraction_id": "72b5a7991bd24f12a5931971c8afda85",
  "version": 2,
  "memory_type": "entities"
}
-->