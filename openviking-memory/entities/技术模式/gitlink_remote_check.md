# 父仓 gitlink 同步前远端优先核验
处理父仓子模块 gitlink 提升前，先用 fetch/ls-remote 读取远端权威状态，不要只信本地 upstream 的 ahead/behind。

## 适用场景
- 本地 upstream 显示 ahead=0 behind=0，但长期未 fetch，ref 陈旧，实测可能落后远端多个提交
- 交接文档或上下文基于本地陈旧 ref 判定「父仓同步未执行」，与远端真实状态有出入时以远端为准
- 目标 gitlink 可能已由他人经重复单在远端更新，无需再建等价冗余提交

## 操作要点
- 用带凭据的 fetch 或 git ls-remote 取远端 tip，再 git ls-tree <远端tip> <子模块> 核对 gitlink 真实 SHA
- 远端若已持目标 gitlink：判定任务完成、链路终止，不 pull --rebase、不建提交、不推送
- 避免 pull --rebase 触碰他人脏的 DETACHED 子模块（common-framework / service-expand）造成副作用
- 只清理本任务过程产物（parent-fetch.ps1/log）并复核远端 gitlink 未变

## 验证与归属
- 2026-11-25 bug6964（整改任务单签字带出；chain_id=bug6964整改任务单签字带出，hop=2）：本地 upstream 0/0 陈旧，fetch 实得 AB=0 11；远端 develop/v2.6.2-suzhufang-dev tip 85cde6a 已把 zhi2-evaluation gitlink 从 45bd4cdc 更新到目标 0b84b64（提交 85cde6a/07cf17b，bug 6911 为 6964 重复原单），链路终止、禅道 6964 已 fixed（文档记录 zt_action id=99510）未重复回写
- 涉及：zhi2-evaluation 子模块、父仓 estate-manage.git、分支 develop/v2.6.2-suzhufang-dev

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gitlink_remote_check",
  "source_extraction_id": "a61bf2baa4294b309df957f2348fb144",
  "version": 1,
  "memory_type": "entities"
}
-->