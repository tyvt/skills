
# orchestrator plan_review 阻塞
DSH orchestrator 插件中 plan_review 因 stallMs 过低而频繁失败的技术事实与修复。

## 问题根因
- orchestrator/lib/index.js 的 callPython 共享 stallMs 配置，原值 45000ms（45s 无输出即杀进程）。
- plan_review 走 auto/deepseek-v4.1-flash 静默推理约 91.6s、workbuddy/deepseek-v4.1-flash 约 33.8s；长计划下 auto 模型在 45s 被 stall 杀死，导致编排失败或卡住。
- plan_reviewer 模型池仅含 Flash 级（workbuddy/deepseek-v4.1-flash + auto/deepseek-v4.1-flash），网关当前无更强非 Flash 模型可用。

## 修复方案
- 将 orchestrator cordis.patch.yml 的 stallMs 由 45000 提升至 120000（可逆单值改动），2026-11-12 编辑 repo 并同步至安装目录 C:/Users/Administrator/.dsh/profiles/web/node_modules/dsh-orchestrator 的 cordis.patch.yml。
- 需重启 Web 进程（node dsh/lib/bin.js web，PID 26632 于 :3080）方能生效；运行进程在内存中仍持旧值，热重载不生效。

## 部署注意
- 宿主实际加载的插件为安装目录副本（非开发目录 skills/dsh 的链接），修改后须同步安装目录并重启 Web 进程。
- 本会话因 PowerShell 多行哈希表解析问题，Web 重启命令未成功执行，stallMs 新值截至 2026-11-12 尚未生效。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "orchestrator_planreview_stallms",
  "source_extraction_id": "4bf3994e2b2f41d69b4e97f5c39863c4",
  "version": 1,
  "memory_type": "entities"
}
-->