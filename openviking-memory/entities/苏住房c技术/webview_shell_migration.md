# 苏住房C原生页改web-view嵌入流程
将已上线原生页改为web-view嵌入第三方H5时，必须保留原生壳页、配置域名白名单、多分支同步提交。

## 核心约束
- 同一原生页常被多入口打开（首页浮层→automaticRobot，个人中心→robot），第三方H5登录态/来源参数可能不一致，不能统一成一个URL，须保留两个原生壳页只替换web-view地址
- 第三方域名必须加入小程序后台「业务域名/合法域名」白名单，否则真机空白或拒绝加载，需与运维/后台协同，不能只提交前端代码
- 多分支项目（v2.1 / v2.1-mp / sfb）改同一处配置时各分支单独提交一条commit，便于cherry-pick与回滚，未授权不push

## 操作步骤
- 先 `git branch -a` 列全部分支 → 逐分支修改目标页 → 每分支一条commit → 回切主干核对工作树干净
- 输出「分支/commit hash」对照表并提醒用户把新域名加进业务域名白名单

## 验证与归属
- 验证证据：聊天机器人页改为web-view嵌入，三分支迁移 v2.1=7b60b2a9、v2.1-mp=aa6466dd、sfb=61961cd4，新域名 digital-accumulation-fund-fe.paas.cmbchina.com 需加白名单，仍未push
- 涉及文件：pages_my/robot/index.vue、pages_main/automaticRobot/index.vue、utils/openAutomaticRobot.js、utils/route-map.js、pages.json
- 所属项目：苏住房C；来源会话ID：f15f2eb0-4255-4cba-a3f7-e1e287df3238；代码基线：a8c9568

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "webview_shell_migration",
  "source_extraction_id": "1e9d9fcc5d254f8bb6175bced3e8798b",
  "version": 1,
  "memory_type": "entities"
}
-->