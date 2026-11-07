# 报事工单评价星星不显示修复
泰兴小程序工作台报事工单评价记录的星星因 SVG 资源缺失及路径错误而不显示，已修复。

## 问题根因
- star-active.svg / star-inactive.svg 两个 SVG 资源缺失
- 员工端 detail.vue 中 4 处图标路径误写为 /static/images/ 而非 /static/svg/

## 修复方案
- 从 git 历史恢复 star-active.svg（黄色实心星）与 star-inactive.svg（灰色空心星）到 src/static/svg/
- 员工端 src/staff/pages_facility/issue/detail.vue 将 4 处路径从 /static/images/ 改为 /static/svg/（评价记录区 2 处、满意度评价弹窗 2 处）
- 业主端 src/pages_owner/repair/detail.vue 原本即用 /static/svg/star-*.svg，恢复 SVG 后一并生效

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证建议：重编译后进入工作台→报事工单，打开已有评价工单详情确认星星高亮、文字标签正常、弹窗可点击
- 涉及文件：src/staff/pages_facility/issue/detail.vue、src/pages_owner/repair/detail.vue 等
- 所属项目：泰兴小程序；来源会话ID：02e556af-812d-4a11-bb67-1891918531a5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "rating_star_fix",
  "source_extraction_id": "aa06516a5e8149c6b7cf2801366c4597",
  "version": 1,
  "memory_type": "entities"
}
-->