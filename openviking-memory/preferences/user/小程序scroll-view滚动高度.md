- 微信小程序 scroll-view 须明确高度（如 h-screen/height:100vh）方可纵向滚动，不可用 flex h-full 作无滚动容器，否则 uv-parse 富文本拖不动
- 标准修复：<scroll-view scroll-y> 外包并加 Uno 类 h-screen w-full bg-fff，内层留 flex flex-col p-40，对齐 surveyResult/index
- 验证证据：src=家园区一网通办/001.md；涉及文件：src/pages-my/project/noticeDetail.vue、uno.config.ts、src/pages-survey/surveyResult/index.vue、pages.config.ts、src/pages-my/feedback/detail.vue、src/style/index.scss、src/pages.json；来源会话：1b979de5-b4f4-400d-bd27-f8c0ac6ae506

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "小程序scroll-view滚动高度",
  "source_extraction_id": "fa36a86ca91144a4b5b4d20b83026084",
  "version": 1,
  "memory_type": "preferences"
}
-->