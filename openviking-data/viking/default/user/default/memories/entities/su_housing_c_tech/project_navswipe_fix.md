# 苏找房页图标导航分页滑动修复
苏住房C小程序苏找房页顶部图标导航分页滑动UI问题已修复。

## 问题原因
- Project_Suzhufang.vue横向导航使用scroll-view，每页宽度设为calc(100vw - 44px)，而滚动容器为全屏宽
- 右侧露出下一页内容，第6个图标被裁切
- 分页指示器错位，滚动距离按错误页宽计算

## 修复内容
- 将scroll-view改为swiper，实现整页切换
- 每页用flex均分5列：flex: 0 0 calc((100% - 32px) / 5)
- 分页指示器跟随swiper的current更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证预期：第一页只显示5个图标，滑动后显示第二页，底部指示器同步切换
- 涉及文件：Project_Suzhufang.vue、MidModuleGrid.vue、Home_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：1d4644c7-b4d9-4f0e-ae82-7cbe27b40a19；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "project_navswipe_fix",
  "source_extraction_id": "024075fb80c64e0a8d2ee5d6485b7b39",
  "version": 1,
  "memory_type": "entities"
}
-->