# 自研useLoadMore失败卡加载整改
苏住房C公告列表Android真机一直加载中，因自研useLoadMore请求失败不回complete，统一改用z-paging。

## 问题现象
- 社区/街道/小区公告三列表页Android真机一直转圈，iOS与开发者工具正常
- 表现“加载中”永不结束

## 根因
- 自研hooks/useLoadMore.js驱动分页，请求失败路径未调用结束/complete回调
- Android真机网络差异稳定触发失败分支

## 解决方案
- 列表分页统一迁到z-paging，抽hooks/useAnnouncementPaging.js集中处理并失败显式complete(false)
- pages.json补z-paging easycom配置，NoticeList加showEmpty开关避免重复空态
- 回滚还原useLoadMore本身避免其他页面回归

## 验证与归属
- 会话802b4a4d：用户要求“都改用z-paging吧”，新增useAnnouncementPaging.js，三公告页改z-paging
- 涉及文件：useLoadMore.js、useAnnouncementPaging.js、pages.json、公告页组件；项目：苏住房C；基线：0cea241

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "useloadmore_zpaging",
  "source_extraction_id": "93ce183c426145c2b955cfbe7c449325",
  "version": 1,
  "memory_type": "entities"
}
-->