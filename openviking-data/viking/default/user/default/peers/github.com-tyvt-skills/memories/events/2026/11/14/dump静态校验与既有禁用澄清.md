# Summary
2026-11-14 `--dump-config` 静态校验通过：首行 `# == @deepseek-ai/dsh-base`、无 `entry not found`、standard workflow 为 disabled:true，full-tools 与 cordis 仍 enabled（兜底成立）；并查明 dump 中 ptc（L1391）的 disabled:true 在备份里已存在、顶层（L650）的 disabled 来自 dsh-web-app 的 base 块，二者均为改动前既有配置，非本次编辑造成。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 选方案 B（只裁 workflow，认掉 session_query 994 token）——8.8% 使用率且无现成切换兜底，风险不划算，先拿低风险的 848 token 落地，session_query 待后续有可切预设机制再议。
...
**assistant [peer=github.com-tyvt-skills]**: 改到位了：standard 块 L291 workflow 现在有 `disabled: true`（L293，12 空格缩进，与 name 同级）。现在 `--dump-config` 校验（断言 F 的静态部分）：无 entry not found、standard workflow=disabled、其余 4 处启用。
**assistant [peer=github.com-tyvt-skills]**: 有个问题！dump 显示 **L650 顶层、L1190 standard、L1391 ptc 都 DISABLED**——但按计划只该禁 standard。让我细看：可能是我的"disabled"检测逻辑被相邻行干扰（顶层 workflow 附近可能有 disabled 的兄弟插件）。逐字节核实每个 workflow 块的真实 disabled 状态。
**assistant [peer=github.com-tyvt-skills]**: 真问题浮现：**顶层（L650）、standard（L1190）、ptc（L1391）这 3 处都 `disabled: true`**，而计划只该禁 standard！

但这不对——我的编辑只动了 profile 里 standard 块一处（L293）。为什么 dump 显示顶层和 ptc 也 disabled？看 profile 原文件：L739(ptc) 和 L650对应顶层——它们在 profile 里是否**本来就有 disabled**？之前 dump（改动前）我看到的 L1390 ptc workflow 没显示 disabled 状态。让我查 profile 源文件里 ptc 块和顶层的 tool-workflow 是否有 disabled（可能是既有的）。
**assistant [peer=github.com-tyvt-skills]**: **关键发现**：profile 里 **ptc 块（L740）本来就有 `disabled: true`**！这是**改动前就存在的既有配置**，不是我的编辑造成的。让我核对备份确认。

而顶层（dump L650）的 disabled 也来自原 profile 或其他 bundle——需确认它是否本来就有。

查备份文件的原始状态。
**assistant [peer=github.com-tyvt-skills]**: **确认无误**：
- diff 显示**我只加了一行 `disabled: true`**（`<=` 表示在备份中不存在、当前新增），没有其他改动。
- 备份里 **L739(ptc) 原本就有 `disabled: true`** —— 这是改动前既有配置。
- 所以 dump 里 ptc disabled 是**既有状态**，非我造成。

但 **dump L1190 是 standard，也 disabled** → 这正是我加的（正确目标）。那 **顶层 L650 disabled** 呢？备份里没有顶层 workflow（profile 只有 4 处，dump 有 5 处，第 5 处顶层来自 bundle）。顶层 disabled 可能是 bundle 自带或 dump 的语义合并。

关键：**标准块（standard）现在 disabled ✅**，ptc 的 disabled 是历史遗留（需确认这是否本就是设计）。让我核对：ptc 原有的 disabled 是否影响本方案——计划说"不动 ptc"，但 ptc 本来就 disabled，那 full-tools 复制时是否继承了？需确认 full-tools 里 workflow 是 **enabled**（dump L2123 显示 enabled ✅）。

顶层 L650 disabled 也要查清来源。它影响"顶层 workflow 是否可用"。查 bundle 里顶层 workflow 定义。
**assistant [peer=github.com-tyvt-skills]**: **顶层 workflow 也在 dsh-web-app 的 base 块里且 disabled:true**。这说明：`dsh-web-app` 的 base patch **本来就把顶层 tool-workflow 禁用了**（顶层 workflow 是给 preset 用的定义，本身不挂主会话，disabled 属正常）。这解释了我前面 dump 看到的顶层 disabled——既有设计。

现在结论清晰：
- 我需要禁的 **standard（L1190 dump / profile L291）→ 已 disabled ✅**（我的改动，diff 唯一新增行）
- ptc（L1391）disabled 是**既有**（备份里就有）
- 顶层 disabled 是 **dsh-web-app base 既有**
- cordis（L1723）、full-tools（L2123）**仍 enabled ✅**（兜底成立）

**唯一疑点**：ptc 原本就 disabled，这意味着"批 1/批 2 计划说不动 ptc"其实 ptc 的 workflow 本来就不可用——但那是既有事实，不影响本方案（本方案目标是 standard）。

不过我要确认：**ptc 原本 disabled 是否意味着 ptc 用户本来就拿不到 workflow**？这与计划"不动 ptc"一致（保持原样）。方案正确。

现在 `--dump-config` 静态断言 F 通过：无 patch 错误、standard disabled、full-tools/cordis enabled。但这只是静态检查，还要 **live 新会话验证**（需重启 dsh web）。先确认静态结果完整。
**assistant [peer=github.com-tyvt-skills]**: 静态验证通过：`applyPatch: false`（这是配置项，非错误）、首行 base、无 `entry not found`、standard workflow disabled:true。

现在进入 **live 验证**：需重启 dsh web → 开新会话。先确认重启方式与当前 web 进程，并采集改前基线需要"重启前"——但配置是启动读取，当前运行的是旧配置，改前基线本可直接从当前会话读（批 1 数据 standard ~8,025 已是改后基线）。

用户授权我重启。先看 web 进程与启动方式。

<!-- MEMORY_FIELDS
{
  "event_name": "dump静态校验与既有禁用澄清",
  "goal": "完成静态校验",
  "summary": "2026-11-14 `--dump-config` 静态校验通过：首行 `# == @deepseek-ai/dsh-base`、无 `entry not found`、standard workflow 为 disabled:true，full-tools 与 cordis 仍 enabled（兜底成立）；并查明 dump 中 ptc（L1391）的 disabled:true 在备份里已存在、顶层（L650）的 disabled 来自 dsh-web-app 的 base 块，二者均为改动前既有配置，非本次编辑造成。",
  "ranges": "0,63-75",
  "source_extraction_id": "70396858c7dc43fd9447408f46d75136",
  "version": 1,
  "memory_type": "events"
}
-->