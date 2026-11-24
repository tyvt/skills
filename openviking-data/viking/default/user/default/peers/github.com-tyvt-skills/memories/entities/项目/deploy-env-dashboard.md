# 部署看板 deploy-env-dashboard
deploy-env 本地前端部署看板的静态页面，实时读取注册表数据并按项目展示五环境部署状态。

## 用途
- 页面为 deploy-env/dashboard/index.html，纯静态 HTML 实时读盘，修改后刷新即生效
- 看板端口 18098，通过计划任务 deploy-env-dashboard + pythonw 开机静默自启
- 数据源为 deploy-env 注册表 SQLite；nginx 已移除 UI 仅作静态服务，站点与代理地址单源登记

## 界面规则
- URL 链接只显示 http:// 开头的跳转地址，去掉 :端口 前缀；构建行只保留构建时间，不重复显示端口
- dist 路径上提至项目标题旁，每个项目只显示一次
- 每个项目固定 5 个环境槽位，卡片宽度由 210px 增至 300px；未命中槽位的 env 进入「其他」兜底卡
- 重复本地部署合并进「本地」卡并标注 [local]/[local-8098]；项目按最新部署时间（built_at）倒序，空值排末位

## 数据与验证
- 当前注册表覆盖 17 个项目；仅苏州市房地产监测V3（fdc-v3）曾有 6 个 env（多出 local-8098，端口 8098，与 local 同 dist）
- selftest_dashboard.py 只测后端数据函数：基线 12 PASS / 1 项既存 FAIL（accounts-rendered 期望门户/本地管理员密码，隐私库无 deploy_env 条目，与前端无关）
- 2026-11-24 改版经 node --check、selftest 与 agent-browser 实机截图验证，commit 7e5a979d 已推送 origin/main

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "项目",
  "name": "deploy-env-dashboard",
  "source_extraction_id": "643f9b33d4f04a7cb436617b6aeccdb3",
  "version": 1,
  "memory_type": "entities"
}
-->