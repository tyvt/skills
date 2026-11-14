# Summary
2026-11-13 用户问及探索期 pwsh 是否触发 explore-drift；确认 decideExplorationDrift 只接 read/grep/glob，pwsh 调用进 guard 回调后函数尾兜底直接 pass，三条规则均不碰 pwsh（逃生通道，刻意不拦）。完全相同的 pwsh 命令由宿主反重复 hook 第 4 次拦，大输出由 token-guard 裁剪落盘，近似但不相同的 pwsh 盲搜暂无层拦截。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 结论是什么，会触发吗？探索期的pwsh？
**assistant [peer=github.com-tyvt-skills]**: **结论：pwsh 不会触发 explore-drift——这是有意设计，不是遗漏。**

## 为什么不触发

`decideExplorationDrift` 只接三个工具：**read / grep / glob**。pwsh 调用进 guard 回调后直接 pass（函数尾兜底返回），三条规则一条都不碰它。

理由有三：

1. **pwsh 是逃生通道，不能堵**：三条规则的拒绝 message 里写的改法就是「先 pwsh Get-ChildItem 列目录」——拦 pwsh 等于把模型往唯一的正确路径上一堵，机制自相矛盾；
2. **pwsh 已有各自防线**：输出过大由 token-guard 裁剪落盘；高危命令走 security_guard；orchestrate 路径还有 stall 熔断；
3. **完全相同的 pwsh 命令**会被宿主反重复 hook 拦（今天实测：同参数连续第 4 次就被「Repeated tool call detected」拒绝，该 hook 不限工具）。

## 探索期 pwsh 的实际覆盖图

| 形态 | 谁拦 |
|---|---|
| 完全相同的 pwsh 命令连发 | 宿主反重复 hook（工具无关，实测第 4 次拦） |
| pwsh 大输出 | token-guard（裁剪/落盘） |
| 高危 pwsh 命令 | security_guard + pwsh 工具内置拒绝（递归列举等，今天也实测过） |
| **近似但不相同的 pwsh 盲搜**（Select-String 换词连发） | **没人拦**——靠 AGENTS.md 自觉 + cost-meter 事后提醒 |

## 残余缺口（诚实说）

最后一行是真缺口：模型如果用 pwsh `Select-String` 每次换一两个关键词连发盲搜，四层防线都无感。要覆盖得对 pwsh 命令文本做 pattern 归一化检测，复杂度高且误拦风险大。建议：**先不做**，等 warn 灰度期 ledger 里看到这类真实案例的发生率，再决定是否值一个增强计划。

<!-- MEMORY_FIELDS
{
  "event_name": "pwsh探索漂移豁免确认",
  "goal": "确认pwsh豁免",
  "summary": "2026-11-13 用户问及探索期 pwsh 是否触发 explore-drift；确认 decideExplorationDrift 只接 read/grep/glob，pwsh 调用进 guard 回调后函数尾兜底直接 pass，三条规则均不碰 pwsh（逃生通道，刻意不拦）。完全相同的 pwsh 命令由宿主反重复 hook 第 4 次拦，大输出由 token-guard 裁剪落盘，近似但不相同的 pwsh 盲搜暂无层拦截。",
  "ranges": "28-34",
  "source_extraction_id": "b460b60b945241d1b49f1dec884d4327",
  "version": 1,
  "memory_type": "events"
}
-->