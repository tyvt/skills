# 横向图标导航改用swiper
苏住房C「苏找房」页顶部图标导航横向分页滑动UI错位，改用swiper整页切换+flex均分列宽解决。

## 问题根因
- 用scroll-view做按页滑动，每页宽度写成calc(100vw - 44px)，而容器全屏宽，右侧提前露出下一页
- scrollLeft按错误页宽换算页码，底部分页指示器错位

## 解决方案
- 分页式横向导航改用swiper，页码绑@change事件current，不自己用scrollLeft推算
- 每页内部flex均分列宽：5列时flex: 0 0 calc((100% - 32px) / 5)（32px为4间距之和）
- 图标数不整除时补齐占位，避免最后一页拉伸
- 确需连续滚动才用scroll-view，此时页宽必须与容器严格同源（都用100%）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话1d4644c7（2026-08-21，基线9832ba3）用户报分页左右滑动UI问题；改Project_Suzhufang.vue为swiper+flex均分+指示器跟随current
- 涉及文件：src/pages/index/components/Project_Suzhufang.vue、src/pages_tab/components/Project_Suzhufang.vue、src/pages/index/project.vue、src/pages/index/components/menu/MidModuleGrid.vue
- 所属项目苏住房C；来源会话ID：1d4644c7-b4d9-4f0e-ae82-7cbe27b40a19

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "swiper_icon_nav",
  "source_extraction_id": "78365181dbcb4a00b458a6e0aa385005",
  "version": 1,
  "memory_type": "entities"
}
-->