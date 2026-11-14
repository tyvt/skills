---
name: dsh-explore
description: 把未知代码库/大范围的定位探索外包给只读子代理，主会话只收 ≤30 行浓缩结论。当需要跨模块定位、试错型查找、目录结构侦察时使用；主会话禁止裸 grep 探索（agent-guard 的 exploration 规则会拦）。
---

# dsh-explore — 探索外包

## 何时用

- 未知根/未知层级的代码定位（AGENTS.md P0-2：先列目录再 glob）；
- 同类批量对象 ≥3 的检索（强制扇出）；
- 预估要连续试错 ≥2 次的查找（agent-guard·exploration 会拦主会话第 3 次同 pattern）。

## 怎么用（Team Lead 场景）

1. `spawn_teammate`（context: fresh）派只读探索代理，prompt 模板：

```
只读探索任务，禁止任何写操作与命令执行类工具（read/grep/glob/pwsh 只读）。
目标：<要找什么，业务语义>
根目录：<具体绝对路径，不要全仓>
产出（≤30 行）：命中文件:行号 + 每条一句话说明 + 推荐的下一步窄命令。
找不到就写「未命中+已排除的关键词」，不要继续盲搜。
```

2. 多对象并行：`workflow` 或多个 teammate 同时派发，主控不串行；
3. 收到结论后再回主会话做局部 read（带 offset/limit）。

## 编排器场景（无 Team）

用 `orchestrate {op:"full"}`，request 写明「只检索定位并返回文件:行号与摘要，不修改文件」。

## 约束

- 子代理产出必须 ≤30 行——超长结论本身就是新一轮上下文污染；
- 主会话拿到行号后用局部读，不要再整读（agent-guard·exploration 规则1 会拦 >300 行整读）；
- agent-guard 的 exploration 规则对子代理会话（header.parentSession 存在）整体豁免，代理内可放开试错。
