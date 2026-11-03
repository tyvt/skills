# 切换小区后行政区域不显示涉顶栏与筛选页
物业手持B端首页切换小区后行政区域不显示，涉及顶栏区域名与三级筛选两条 UI 链路，待排查。

## 问题根因
- 根因：切换小区后「行政区域不显示」涉及首页顶栏当前区域名与小区选择页三级行政区域筛选（区域/街道/社区）两条 UI 链路，具体文件与数据流待排查

## 验证与归属
- 验证证据：src=物业手持B端/002.md
- 涉及文件：src/pages/home/index.vue、src/api/home.js、src/components/ProjectPicker/ProjectPicker.vue、src/pages/complex-select/index.vue、src/store/user.js、src/hooks/useAreaDict.js、src/components/ZsPicker/ZsPicker.vue、src/pages/login/index.vue
- 来源会话ID：fb0c52c4-df72-4879-926b-5994451035e6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "switch_area_hidden",
  "source_extraction_id": "b4c8026653be44108193df34322483d4",
  "version": 1,
  "memory_type": "entities"
}
-->