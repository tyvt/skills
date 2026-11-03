# 报事报修列表 z-paging 盖住顶部操作区修复
无锡市区小程序嵌入H5中「我的-电子业主卡-报事报修」列表页顶部操作区被 z-paging 滚动层覆盖的修复约定。

## 现象
- 「前往报事报修」蓝色条与搜索/筛选被列表滚动层盖住。

## 根因
- z-paging 在页面 flex 布局下未占满高度，列表内容区 position:absolute 叠到 #top 之上。

## 解决方案
- 「前往报事报修」与搜索筛选一并放进 #top 插槽。
- z-paging 设 height:100% + flex 纵向布局。
- 顶部区 z-index:10，列表 content-z-index:1。
- page 高度相关样式用非 scoped 保证高度链贯通。
- 注意：库内另有「fixed 全屏盖住顶栏」场景需 :fixed="false"，本页是 fixed 布局下的高度/z-index 问题，两套解法不要混用。

## 验证与归属
- 验证会话：35c311a0-d465-4e73-b3b7-f836ef5c6b40（基线 6c9a164），结论写明 z-paging 未 height 100%、顶部缺层级、按钮未进 #top，修改 repair/index.vue 与 pages.json 标题。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/repair/index.vue、zhi2-mobile-admin-h5-c-unlimited/src/pages.json。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "repair_zpaging_top_cover",
  "source_extraction_id": "a7ccb2bad8e148e3977562a553bc29a0",
  "version": 1,
  "memory_type": "entities"
}
-->