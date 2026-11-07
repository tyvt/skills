# 苏住房C同源项目分支路径适配
苏住房C 的 zhi2-mobile-shimin 与泰兴小程序、苏州房地产监测V3 同源复制，但 main-v2.1 与 -mp 两分支已分叉出不同路径体系，迁移须按对照表改。

## 问题现象与根因
- 同源项目内 main-v2.1 与 -mp 两分支在不同时间点从母版剪出，组件目录与分包前缀各自演进
- 直接照搬另一分支的 import 路径或路由常量会 import 失败 / 跳转 404，且往往不报编译错、运行时静默白屏
- 典型差异：ZsPaging 在 main-v2.1 是 @/components/ZsPaging，在 mp 是 @/pages_owner/components/ZsPaging
- 公告详情路由 /pages/announcement/detail vs /pages_main/announcement/detail；业主卡 pages_owner/ownerCard vs pages_owner_extra/ownerCard

## 解决方案
- 迁移前建「模块→main-v2.1路径/mp分支路径」对照表（组件、页面路由、目录前缀三类各一行），按表逐项替换
- 迁移完在目标分支全局搜旧路径确认无残留
- 确认子模块与父仓库各自分支：子模块在 main-v2.1、父仓库在 -mp 时，mp 分支其它改动应 stash 而非混进本次提交

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 c6f5e6b8 社区/街道公告 z-paging 改造 + 业主卡报事报修「暂未开放」迁移到 main-v2.1
- 涉及文件：src/hooks/useAnnouncementPaging.js、src/pages_owner/community/announcement/index.vue、src/pages_owner/subdistrict/announcement/index.vue、src/pages_owner/ownerCard/index.vue
- 所属项目：苏住房C；来源会话ID：c6f5e6b8-04ec-4597-8607-ff8f6c062f99；代码基线：4d6dba9

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "branch_path_mapping",
  "source_extraction_id": "a725f791950e4fc49d6298dbdd82d457",
  "version": 1,
  "memory_type": "entities"
}
-->