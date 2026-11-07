# 巡检记录筛选重置图标缺失
物业手持B端巡检/维保/年检/报废记录页筛选弹窗底部重置图标丢失，已将组件图标改为 uni-icons 恢复。

## 问题根因
- `FilterPopup.vue` 使用 `ZsImage` 渲染重置图标，图标丢失导致四处筛选弹窗均无重置图标

## 解决方案
- `FilterPopup.vue` 模板将 `ZsImage` 替换为 `uni-icons type="reload"`，与消息页、知识库页一致
- `.footer` 栅格列宽 `48rpx 1fr` 调整为 `74rpx 1fr`，删除无效 `.img` 样式，`.footer-btn-left` 增加 `gap: 2rpx`
- 组件被巡检/维保/年检/报废四种记录页共用（均通过 `record/index.vue`），四处重置图标一并恢复
- `resetFilter` 逻辑未改动，点击重置仍清空筛选条件并刷新列表

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages_facility/components/FilterPopup.vue、src/pages_facility/record/index.vue、src/components/ZsImage/ZsImage.vue、src/styles/filter.scss、src/pages/workbench/index.vue
- 来源会话ID：968007f3-27fb-42d1-8f25-77718e3e4f44
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_filter_reset",
  "source_extraction_id": "c91dad9743c7431e807498094b1afa1f",
  "version": 1,
  "memory_type": "entities"
}
-->