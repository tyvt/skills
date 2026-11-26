# Summary
2026-11-25 用户要求继续用已有脚本抽检 OpenViking 记忆 10 条；随后使用 scripts/memory_audit.py 完成 select、逐条代码证据核对、apply 和 stats，10/10 回写成功，判定 8 条有效、2 条无效，累计 checked 25（valid 18、invalid 7）、覆盖 0.4%。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 继续用已有脚本抽检openviking记忆10条
...
**assistant [peer=github.com-tyvt-skills]**: 已用 `scripts/memory_audit.py` 完成第二轮抽检（select→代码证据核对→apply→stats），10/10 已回写。

**判定结果（8 valid / 2 invalid）**
- **valid（8）**：苏服办登录弹窗、register_e2e、zhi2_web_admin、list_card_struct、mm_pie_legend、vite_slot_parse、sidebar_refresh_empty、step_choose_highlight —— 均在对应仓库核到记忆所述文件/符号（如 `h5Context.js:180 showSfbLoginErrorModal`、`menuVisibility.js normalizeMenuPath`、`optional/StepChoose.vue highlight` 等）。
- **invalid（2）**：
  - `vue3 v-on监听对象兜底` —— 全库无 `safeListeners`，各副本 `SearchFormItem.vue` 仍是原始 `v-on` 写法，修复未落地。
  - `uni_login_appid_missing` —— 记忆所述 `pages/home/new/index.vue` 等文件全库不存在，代码证据不匹配。

**收尾**
- 覆盖率 0.4%（total 6585 / checked 25：valid 18 / invalid 7），较上轮 +10。
- 处理了一个 URI 归一化问题：带空格标题的记忆被 OpenViking 写成 `_` 形式，已把 frontmatter 合并到规范文件并删除空格版重复条目，最终该 URI 唯一。
- 审计日志保留在 `~/.dsh/cache/memory-audit/audit.jsonl`（+10 条）；临时 `verify.sh`/`result.json` 已清理。
- 未做 git 提交：写的是 OpenViking 服务端记忆，不落本地仓库；未跑构建（本轮只写缓存临时文件，无源码改动，build-gate 为误报）。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking抽检回写完成",
  "goal": "抽检回写",
  "summary": "2026-11-25 用户要求继续用已有脚本抽检 OpenViking 记忆 10 条；随后使用 scripts/memory_audit.py 完成 select、逐条代码证据核对、apply 和 stats，10/10 回写成功，判定 8 条有效、2 条无效，累计 checked 25（valid 18、invalid 7）、覆盖 0.4%。",
  "ranges": "0,87-93",
  "source_extraction_id": "7fe8f232b3f246ec8a87c98fc2587483",
  "version": 1,
  "memory_type": "events"
}
-->