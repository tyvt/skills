# 预售许可公告接口对接
门户预售许可公告接口已按计划对接，涉及新增 API 与 UnifiedLogin 改造。

## 新增接口
- 新增 zhi2-web-admin/src/api/presale/openNotice.js
- 提供 GET /presale/open/notice/list，参数 noMessage: true、skipAuthDialog: true（与门户免登录接口一致）

## UnifiedLogin 改造
- 去掉 mock，挂载时调用 loadPresaleNoticeList()，过滤 cancelFlag 为 1 取前 4 条
- 映射：permitNo → 许可证号（空为「—」）、projectName、companyName
- presaleLoading 加载中不显示「暂无」；无数据展示「暂无预售许可公告」
- 列表 :key 使用 applyCode，缺失时回退索引

## 联调与归属
- 开发环境走现有 /api/v3.0/presale
- 涉及文件：openNotice.js、UnifiedLogin.vue、publicAnnouncement.js、externalInfo.js
- 所属项目：门户；来源会话ID：6b002207-e45f-4242-836c-3b25c34bb174；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_notice_api",
  "source_extraction_id": "a6275ba127694256b7356f71babb6ee3",
  "version": 1,
  "memory_type": "entities"
}
-->