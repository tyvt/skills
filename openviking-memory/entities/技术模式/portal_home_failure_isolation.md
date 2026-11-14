# 首页接口失败隔离修复
苏住房防汛C端移动查询H5 的首页五个 portal 区块由共用 Promise.all 改为逐接口失败隔离，避免单个接口失败导致整页空白。

## 问题根因
- home 5 个区块共用 Promise.all，任一接口 reject 则整组都不赋值
- 近期提交移除了 loadHome() 的 catch，首页加载缺少异常兜底
- 2026-11-14 复核时首页仅剩通知标签、待办与空标题，新闻与学习数据在 8095 旧代理上报 404

## 解决方案
- portalData.ts 与 home/index.vue：5 个首页接口各自失败回退空态
- 首页加载与学习园地 tab 切换时捕获异常
- 修复计划先通过自动审核，人工确认后才改码

## 验证与提交
- H5 构建、语法、差异检查通过；类型检查仍 26 条既存错误，涉改文件无类型错误
- 提交 04e305adbe2dc4c13c04bb5458492110c6664817（fix(home): isolate portal section failures）推 origin/dev，远端哈希一致
- 该提交仅含首页两个源码文件与审核计划文件，.env.test 及未跟踪文件保留工作区

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_failure_isolation",
  "source_extraction_id": "498ae34cf4d94249bf5ea2eb5f0e8b01",
  "version": 1,
  "memory_type": "entities"
}
-->