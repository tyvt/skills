# 年度预算页面科目显示与背景修复
苏住房C小程序 pages_benefit/budget/index.vue 中预算科目显示错误且页面背景未撑满全屏，已修复。

## 问题根因
- 预算科目为单选字段，原用 getDictLabel 按逗号拆分匹配多字典项拼接（如「代收代缴收入，物业费收入」），导致显示错误。
- 灰色背景 #f7f7f7 只设在 content-scroll 上，页面容器 min-height:100%+白底，内容少时底部露白。

## 修复内容
- 优先使用接口返回 budgetSubjectName；否则按单个科目编码精确匹配字典（只取第一个编码）。
- 为 page 和 .budget-page 设置 #f7f7f7 背景并使用 min-height:100vh。
- content-scroll 占满剩余视口高度，卡片列表区域改透明灰底避免白色断层。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译运行：科目应只显示「代收代缴收入」，灰色背景铺满全屏。
- 涉及文件：pages_benefit/budget/index.vue 等
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：6222418a-4f22-4b84-9de7-cbcaaf49e929

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "budget_page_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 1,
  "memory_type": "entities"
}
-->