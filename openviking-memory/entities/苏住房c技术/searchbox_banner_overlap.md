# 搜索框半压Banner的稳定做法
首页头部搜索框上下各露一半横跨Banner与白色区域交界，且白色区域紧贴Banner无缝隙，在苏住房C两处同源文件反复返工。

## 问题根因
- 搜索框用 bottom:-24px 表示下移半个高度，同时 header-wrap 用 padding-bottom:24px 让位，两者语义等价互相抵消，搜索框实际落在Banner下方未叠上。
- 另一轮 header-wrap 残留 margin-bottom:24px 变成Banner与白色块可见缝隙，用户报「白色背景和Banner之间有间距」。

## 解决方案
- 搜索框改 bottom:0 + transform:translateY(50%)，以Banner底边为锚点上下各露 h/2，不再用负值。
- 去掉 header-wrap 的 padding-bottom，让位改为 margin-bottom:h/2，保证下方导航图标不被压住。
- 若要求白色区域紧贴Banner，则 margin-bottom 归零，改由白色块自身 padding-top 承担让位（如 24px 搜索框下半 + 9px 图标间距 = 33px），白色底仍从Banner底边开始无缝隙。
- 改完 pages_tab/components/Project_Suzhufang.vue 与 pages/index/components/Project_Suzhufang.vue 两处同源文件都要同步。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 f3ee482c 后经 63ca5f15（基线 8fc3cc5）把 bottom:-24px+padding-bottom:24px 抵消改为 bottom:0+translateY(50%)+margin-bottom:24px；会话 8d4ad7df（基线 8fc3cc5）再去 margin-bottom、白色块 padding-top 改 33px。
- 涉及文件：d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_tab\components\Project_Suzhufang.vue、d:\repository\苏住房C\zhi2-mobile-shimin\src\pages\index\components\Project_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：63ca5f15-1cf5-4d52-b386-3205bad2f5ba, 8d4ad7df-77b2-4614-8dcd-322eea0ae772；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "searchbox_banner_overlap",
  "source_extraction_id": "2df5dc51c76245cd8e19edc921ee51af",
  "version": 1,
  "memory_type": "entities"
}
-->