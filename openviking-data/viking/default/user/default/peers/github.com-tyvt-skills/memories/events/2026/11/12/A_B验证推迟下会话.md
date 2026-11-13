# Summary
2026-11-12 确定 baseline 与 A/B 测试均在下个会话执行，本轮只交付代码+单测/selftest，不声明已生效/已降本。插件与 graph.py 需 profile 外重载生效；E1 默认关需显式开启验证。本会话未推送远端，仅本地 commit。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...按上面 3 个缺口补齐后，E2 和 E1 才是"能直接开工"的状态；现在这两处是"方向对、细节悬空"。

## 建议的下一步

如果决定实施：先只做 **P0 的 E1 最小版 + E2（含 review state 桥接 + 增量送审）**，一个 commit，下个会话跑 baseline + A/B。验证通过再推 P1。不要一次性 6 步全上——本会话 1M token 的教训就是"想一次做完"。
...
**assistant [peer=github.com-tyvt-skills]**: 你的反馈我全部吃下了，尤其三个硬缺口确实会让实施当场卡住——其中 **E2 数据流缺口**我核实后确认是硬伤：`plan_review` 跑在编排器子进程 `api.py:241 run_plan_review`，宿主 `plan-gate` 是另一个进程，`plan-gate` 的 `ctx.tools.guard` 根本感知不到 review 发生过。已改成桥接方案。

方案已升到 **v3**：[.plan/session-17421cb4…md](.plan/session-17421cb4-4019-446b-be29-a38638fdd4cf.md)（237→264 行）

## 按你意见落地的改动

**① 优先级重排（§1.3 新增 + §八 实施清单）**
- P0（80%）= E1 最小版 + E2；P1 = E3/E7/E1 完整版；P2 = E4/E5/E8；**E6 降为 policy 一段**，不占独立步骤。
- **commit 边界写死**：graph.py E1 独立 commit（唯一高风险可单独 revert）；api.py+plan-gate（E2）同 commit（桥接与消费方必须同批，否则计数失效）；E3/E4/E5/E7 一个；E8 一个且默认关。

**② 三个硬缺口全补**
- **E2 桥接（硬伤已修）**：`api.py run_plan_review` 返回前写 `.plan/<sid>.review.json`（sha256/round/verdict/mtime/ts，`Path.write_text` 现成模式），`plan-gate` 读它判 hash 复用/轮次/证据。加了「同 sha256 不加 round」防重复计数。
- **E1 拆两步**：1a 最小版只解本会话真正卡的「绝对路径 `Get-Content/Select-String`」——realpath 归 repoRoots + 拒 symlink + 敏感名 + `_DANGEROUS_CHARS` 最前，**负例只 3 个**，两小时能完；1b 完整版（参数级白名单/`git log -p` 带路径/which 校验）退到 P1。
- **增量送审（新）**：`run_plan_review` 有上轮基线时只发 `difflib.unified_diff + 新增证据`，reviewer 基于上轮续审——同时降 E2 input 和 E3 output，比 E3 的"提示"更根治。

**③ 口径收紧**
- 验收：**3 任务全达标才算通过**，均值达标但单任务不达标复测一次。
- 编排器计数：**主指标按 orchestrate 调用次数**（附 execute 执行数），否则一次 5 步会被低估成 5。
- **生效时机写死**：本轮只交付代码+单测，**baseline+A/B 均在下会话**，本轮不得声明"已生效"。
- **补 TEMPLATE.md 骨架**（`## 二、已核验事实` 逐条 `文件:行`），硬拒才有依据。
- **告警文案直接写"禁止全量 write/全量 read"**（不新增跨插件机制）。
- §七 全给默认值：E1 开/E2 接受硬拒/E8 关/E6 自评/本轮不实施。

**④ 你的判断我也认**：两轮 reject 剩的是"实施后才有的产物"没错，但你说的更对——**价值在"能不能对着行号直接改"**。现在 E1/E2 是"能开工"状态了。

## 下一步
按你的建议，实施就先做 **P0 = E1 最小版 + E2（含桥接+增量送审），一个 commit，下会话跑 baseline+A/B**，不一次六步全上。

要我现在就动手 P0 改代码吗？还是你先过一遍 v3 文档？
...
**assistant [peer=github.com-tyvt-skills]**: P0 实施完成并已提交。

## 完成情况

**代码改动（2 个 commit，只提交本会话 6 个文件，遗留脏改动原样保留）**

### commit-1 `940be263` — E1 最小版（graph....

<!-- MEMORY_FIELDS
{
  "event_name": "A/B验证推迟下会话",
  "goal": "记录验证安排",
  "summary": "2026-11-12 确定 baseline 与 A/B 测试均在下个会话执行，本轮只交付代码+单测/selftest，不声明已生效/已降本。插件与 graph.py 需 profile 外重载生效；E1 默认关需显式开启验证。本会话未推送远端，仅本地 commit。",
  "ranges": "19,75,249",
  "source_extraction_id": "5dae805251754244a970fad182b16048",
  "version": 1,
  "memory_type": "events"
}
-->