# 巡检记录添加页滚动条遮盖文字
物业手持B端工作台巡检记录添加/详情页因嵌套滚动导致滚动条遮盖文字，已改为弹性布局并去除内层滚动。

## 问题根因
- `record/add.vue` 步骤弹框使用 `scroll-view` 嵌套 `max-height: 55vh`，产生内层滚动条遮盖文字
- 底部留白不足导致字数统计被裁切

## 解决方案
- `record/add.vue`（巡检/维保/年检）步骤弹框 `scroll-view` 改为 `div.step-form-body`，去掉 `max-height: 55vh` 嵌套滚动
- 弹框内容区改 `flex: 1` + `overflow-y: auto`，仅整体超 85vh 时滚动
- `.warp` 底部留白 `48rpx` 增至 `60rpx`，避免字数统计被裁切
- `.step-form-textarea` 与 `.step-result-card` 增加 `:deep` 样式 `min-height: 200rpx`、`height: auto`、`overflow-y: hidden`，消除 textarea 内部滚动条
- `record/detail.vue` 与 `record/addScrap.vue` 步骤弹框同步改为 `div.step-form-body`

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages_facility/record/add.vue、src/pages_facility/record/detail.vue、src/pages_facility/record/addScrap.vue、src/pages.json、src/components/ZsTextarea/ZsTextarea.vue、src/pages_facility/record/index.vue
- 来源会话ID：e30414f9-6aa0-4b85-a036-8d290dd756bb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_scroll_cover",
  "source_extraction_id": "c91dad9743c7431e807498094b1afa1f",
  "version": 1,
  "memory_type": "entities"
}
-->