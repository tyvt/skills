# 筛选重置图标缺失模板补全
巡检筛选重置图标不显示因 `FilterPopup.vue` 模板未正确渲染图标节点，需恢复重置图标元素声明。
## 问题根因
- `FilterPopup.vue` 模板中重置图标节点未正确声明或渲染，导致视觉缺失。
## 解决方案
- 在 `FilterPopup.vue` 模板中恢复重置图标元素声明以补全视觉缺失。
## 验证与归属
- 所属项目：物业手持B端
- 验证证据：extracted source=cursor project=物业手持B端
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages_facility/record/index.vue、src/pages_facility/components/FilterPopup.vue、src/pages/workbench/index.vue、src/components/ZsImage/ZsImage.vue、src/styles/filter.scss、src/pages/knowledge/index.vue、src/pages/message/index.vue、src/pages/complex-select/index.vue
- 来源会话ID：968007f3-27fb-42d1-8f25-77718e3e4f44
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "filter_popup_reset",
  "source_extraction_id": "a2c76c9bc7b6443e88f1f37573a29346",
  "version": 1,
  "memory_type": "entities"
}
-->