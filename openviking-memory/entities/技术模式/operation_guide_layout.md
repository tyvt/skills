# 门户操作指引页面设计稿还原规范
门户操作指引页按设计稿像素级重写，统一顶栏、Banner、Tab 与内容区尺寸及三类正文版式。

## 布局尺寸
- 顶栏高 118px、Banner 高 367px、Tab 条高 83px（选中块 63px）
- 内容区宽 1398px，全部按设计稿像素对齐（卡片框、Tab 框逐像素重合）

## 正文版式
- 三类版式：带顶部粗蓝边与细描边的淡蓝分区卡、三步平铺卡、单块提示
- 正文字号 16px / 行高 1.65，卡片标题 20px
- 文案按设计稿逐字录入（如材料清单）

## 备案查询页
- 深蓝标题条、表单卡、3 列 12 字段结果卡
- 内边距 65px、行高 56px，去掉多余页脚，高度偏差归零

## 验证与归属
- heightDelta 为负是设计稿画布底部留白（商品房 216px、存量房卖房 182px 等），页面不补该留白不影响比对
- public/assets/images/operationGuide/banner_*.jpg 为设计图裁出的 Banner 插画（已擦除文字）；替换时在 config/operationGuideBanners.js 追加 {src} 即可，无需改组件
- 旧功能测试因 DOM 结构改动、断言仍找 .guide-step-title 等选择器失败，已同步更新
- 涉及文件：config/operationGuideBanners.js、config/operationGuideContent.js、router/index.js、version.js、tests/e2e/operation-guide.spec.ts、manifest.js
- 所属项目：门户；来源会话ID：session_e82fa10a2d53a413d9975e6ae6524bd0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_guide_layout",
  "source_extraction_id": "38c4fed0fdf5450498d3c66aeea4789a",
  "version": 1,
  "memory_type": "entities"
}
-->