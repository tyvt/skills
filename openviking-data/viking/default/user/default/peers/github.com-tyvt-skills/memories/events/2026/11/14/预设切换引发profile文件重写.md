# Summary
2026-11-14 核对 diff 时确认：dsh web 在切换 full-tools 预设后重写了整个 profile 文件，把 `[ text, image ]` 规范化成 `[text, image]`（22 处），selectedDefault 两处仍为 standard；归一化空白后唯一语义差异就是新增的 `disabled: true`，且 dump 无错误，判定无害。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 发了，验证
...
**assistant [peer=github.com-tyvt-skills]**: 注意 diff 多了两行：`selectedDefault: standard` vs `full-tools`。这是因为你**切到 full-tools 预设开会话时，dsh web 把当前选中预设写回了 profile**（`selectedDefault` 从 standard 改为 full-tools）。这不是我改的，但会影响默认预设！

需要确认：现在默认预设变成 full-tools 了吗？若是，应恢复为 standard（批 1/2 设计是 default=standard 精简、full-tools 按需切）。查证并修正。
**assistant [peer=github.com-tyvt-skills]**: 澄清：profile 里 `selectedDefault` **两处都是 standard**（L532/L533）。那 Compare-Object 报的差异是**行内容相同但位置偏移**（因为我插入了 disabled 行，后续行整体下移一位，Compare-Object 按顺序比较产生了噪声差异）。实际 selectedDefault 值未变。

确认：真正的内容差异只有 `disabled: true` 一行。用更精确的 diff 核实（忽略位置）。
**assistant [peer=github.com-tyvt-skills]**: 噪声很大——dsh web 运行时**重写了整个 profile 文件**（`input: [text, image]` 的格式化空格从 `[ text, image ]` 变成 `[text, image]`，22 处）。这是 web 重启/切换预设时对 patch 文件做了格式化规范化，不是我改的。

关键判断：真正语义差异仍是 1 行 `disabled: true`（新增），其余是格式空白变化。但需确认 dsh web 是否**误改了别的配置**。行数 1417→1418（+1，正是我加的 disabled 行）。

这些格式变化是 dsh 自己写回的。为避免混入无关格式变更污染提交，理想是让 profile 只剩 `disabled:true` 一处语义改动。但既然 web 已规范化写回，且语义等价，**不影响功能**（dump 已验证正确）。

我确认一下：这些 `input: [text, image]` 格式化变化是否 semantic 等价（只是空格）。用 dump 最终确认配置正确、并检查有无其他语义改动。
**assistant [peer=github.com-tyvt-skills]**: 归一化空白后：**唯一语义差异 = 新增 `disabled: true`**（"删除"侧显示的是备份侧视角）。所有 `input: [text,image]` 差异都是空格规范化，语义等价。dump 无错误。

所以最终 profile 的语义改动就是我要的一行。dsh web 写回时的空格规范化无害。

验证全部完成。更新 todo 收尾。

<!-- MEMORY_FIELDS
{
  "event_name": "预设切换引发profile文件重写",
  "goal": "排查diff噪声",
  "summary": "2026-11-14 核对 diff 时确认：dsh web 在切换 full-tools 预设后重写了整个 profile 文件，把 `[ text, image ]` 规范化成 `[text, image]`（22 处），selectedDefault 两处仍为 standard；归一化空白后唯一语义差异就是新增的 `disabled: true`，且 dump 无错误，判定无害。",
  "ranges": "0,26-32",
  "source_extraction_id": "186dfdf1b42044a981f9a67468f2832a",
  "version": 1,
  "memory_type": "events"
}
-->