# 巡检弹框滚动遮字改flex布局
巡检添加/详情弹框因 `scroll-view` 嵌套 `max-height` 导致滚动条遮字，需弃嵌套滚动改 flex。
## 问题根因
- `add.vue` 与 `detail.vue` 中使用 `scroll-view` 嵌套 `max-height` 容器，滚动条遮挡文字。
- textarea 内部滚动进一步加剧布局问题。
## 解决方案
- 改用 `div.step-form-body` 配合 `flex:1` 与 `overflow-y:auto` 实现弹性滚动。
- 去除 textarea 内部滚动，由外部容器统一滚动。
## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages.json、src/pages_facility/record/add.vue、src/components/ZsTextarea/ZsTextarea.vue、src/pages_facility/record/index.vue、src/components/ZsDialog/ZsDialog.vue、src/styles/form2.scss、src/pages_facility/issue/detail.vue、src/pages_facility/repair/submit.vue
- 来源会话ID：e30414f9-6aa0-4b85-a036-8d290dd756bb
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_dialog_flex",
  "source_extraction_id": "a2c76c9bc7b6443e88f1f37573a29346",
  "version": 1,
  "memory_type": "entities"
}
-->