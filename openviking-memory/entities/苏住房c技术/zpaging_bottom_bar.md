# z-paging固定模式底部白条遮挡loading
苏住房C自定义TabBar下z-paging的fixed模式因多重底部留白叠加，导致列表底部白条遮挡loading，看似不加载更多。

## 问题现象
- 列表滚到底部不会自动加载更多，修完页面空白，再修底部出现白色区域挡住loading
- 用户原话「页面最底下为什么有白色的，把loading也挡住了」
- 白条来源三叠加：tab-bar-placeholder占位、z-paging fixed按原生TabBar高度上缩、loading被盖

## 解决方案
- 删掉tab-bar-placeholder和无效bottom-offset死参数
- 用paging-style.bottom对齐自定义TabBar真实高度：`calc(106rpx + env(safe-area-inset-bottom))`
- 关闭safe-area-inset-bottom避免重复加安全区；页面背景统一#f5f5f5防刺眼白块
- ZsPaging在本项目有4份副本（pages_main/owner/owner_extra/transaction），改组件层评估四份同步

## 验证与归属
- 验证会话dc3620d1三轮：用户报不加载→空白→白条挡loading，改为显式bottom+关安全区+背景统一
- 涉及文件：pages/index/project.vue、pages_main/components/ZsPaging/ZsPaging.vue、pages_main/index/project.vue
- 所属项目：苏住房C；代码基线：4630e8e；来源会话ID：dc3620d1-8787-4997-ad0a-327ea076910f

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zpaging_bottom_bar",
  "source_extraction_id": "28d9eabd30b54d718cb36189284f8f55",
  "version": 1,
  "memory_type": "entities"
}
-->