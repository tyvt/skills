# z-paging默认fixed全屏定位盖住顶部操作区
苏住房C列表页（如报事报修列表）顶部的搜索/筛选/按钮被 z-paging 列表内容盖住，根因是 z-paging 默认 fixed 全屏脱离文档流。

## 问题现象
- 列表页（如 pages_owner/repair/index.vue 报事报修列表）顶部搜索框、筛选、「前往报事报修」按钮被列表内容盖住
- 截图上看顶部操作区被吃掉

## 根因
- z-paging 默认 fixed 全屏定位，脱离文档流并铺满视口，列表层叠在页面顶部正常流元素之上
- 页面按普通流写搜索/筛选区，必然被压住；不是 z-index 调数值能解决，因为整个列表容器已脱离页面布局

## 解决方案
- 顶部固定操作区 + 下方列表的页面，列表关掉固定定位：给 z-paging 加 :fixed="false" 让其参与正常文档流
- 页面根容器用 flex 纵向布局，顶部操作区加 flex-shrink: 0 防压缩
- 列表区用 flex: 1 + min-height: 0 占满剩余高度并支持滚动（min-height:0 是内部滚动生效关键）
- 与「列表分页统一用 z-paging」约定不冲突：仍是 z-paging，仅非全屏列表页显式关掉 fixed

## 验证与归属
- 验证：会话 adb68ad1 用户贴图报「电子业主卡-报事报修，页面显示把顶部前往报事报修筛选等操作盖住了」，定位 z-paging 默认 fixed 全屏，修复为 :fixed="false" + .repair-page flex 纵向 + 顶部 flex-shrink:0 + .page-body flex:1/min-height:0
- 涉及文件：src/pages_owner/repair/index.vue、src/hooks/usePaging.js、src/pages_owner/propose/index.vue、src/pages_owner/tenant/index.vue
- 所属项目：苏住房C；来源会话ID：adb68ad1-d25d-4cff-8fc2-1aef22ec90cb；代码基线：d43894b

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_fixed_overlap",
  "source_extraction_id": "ff4e295f73a04f89870b32c194302e72",
  "version": 1,
  "memory_type": "entities"
}
-->