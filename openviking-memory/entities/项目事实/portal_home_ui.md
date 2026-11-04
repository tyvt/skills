# 门户对内首页三角色 UI 对齐与验证
门户对内首页（admin/developer/broker）按设计稿对齐 UI 并完成 e2e 验证，全部收尾。

## e2e 结果
- 4/4 通过（6.6s）：三角色 @1920 结构断言（统计条项数与文案、板块标签与 tile 数、常用功能、待办 8 行、欢迎卡/公告）+ 全页截图；@1024 三变体冒烟通过

## 收尾改动
- HomeUserCard.vue：min-height 178→192px，插画 118→140px，欢迎卡存在感更接近设计稿
- HomeNoticeList.vue：合并重复的 @keydown 修饰符，lint 归零（eslint src/views/home 0 error）
- 删除调试文件 debug-mock.mjs、临时探针 spec；后台 dev server 已停止

## 1024 窄屏结论
- 实测溢出根因是待办 el-table 最小宽（~1509px）把壳层撑宽，body 走横向滚动——与该管理壳其他表格页行为一致，属预期降级，非布局破坏
- 1920 设计宽度下无任何问题

## 验证与归属
- 验证证据：extracted source=workbuddy project=门户
- 涉及文件：HomeUserCard.vue、HomeNoticeList.vue、package.json、tests/e2e/portal-home-visual.spec.ts、index-new.vue、homeDataMixin.js
- 所属项目：门户；来源会话ID：ca2d1b01-7b20-4144-be0e-885935ebf70b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "portal_home_ui",
  "source_extraction_id": "8ec795904ec548c1801fc2e87c6a2106",
  "version": 1,
  "memory_type": "entities"
}
-->