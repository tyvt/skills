# agent-cost-hygiene
DSH 技能仓库中的成本卫生技能，定义跨会话通用的 AI 降本纪律，把规范下沉为框架强制而非靠模型自觉。

## 读取与推理纪律
- 读大文件窄读：先 grep 定位再带 offset/limit 读取；文件超过 200 行且未指定 offset/limit 时，read 先返回前 40 行并提示用 grep 后 read offset/limit；禁止 src/** 全量 grep。
- 反空转：reasoning 占比过高且无工具调用时立即取事实；同形态工具不连试三次（如 DBX 查询 seq44/49/54）。
- 截图策略：同一图片本会话只分析一次，首次全页转录已含答案则二次靠上文。
- grep 默认 scope 收敛到本会话最近读取过的模块；匹配超过 20 条时只返回文件列表与每文件前 3 条，全文落盘不回灌。

## 构建与工具纪律
- 环境预检：跑 lint/tsc 前先确认 eslint.config 等工具配置存在，无则跳过并标注（seq193 无效 eslint）。
- 本机构建与止损：构建必须在 commit 之后，使 hash 指向含修复的提交（seq222/280 顺序错误）；cost-meter 首次警告即止损提交并标注未验证。
- 截断即换路径：看到 `chars 0..200`/`omitted`/`已截断` 立即换形态（DBX→UNION ALL 分段、文件→offset），别原样重跑；细则指向 zentao-analyzer/dbx.md。

## 成本计量
- 成本按模式归因：reasoning_bare / wide_grep / repeat_read / vision_repeat / tool_retry；警告后不许继续空转（seq129→146→159）。

## 维护与定位
- 源码位于 D:/repository/skills/agent-cost-hygiene/SKILL.md（运行时 C:\Users\Administrator\.dsh\skills 指向）。
- 与 agent-guard、dsh-cost-meter、token-optimizer 协同；DBX UNION ALL 细则在 zentao-analyzer/references/dbx.md，不重复定义。
- 2026-11-11 由 session.v4.json（bug 6452）成本审计报告补全上述规则（提交 d535b3a2）；同日 DSH 调用日志分析建议落地，与 dsh-cost-meter perStepLookup 同源优化。


<!-- MEMORY_FIELDS
{
  "category": "技能",
  "name": "agent_cost_hygiene",
  "source_extraction_id": "c9b2869e096e448fbf6f2d739d1add2d",
  "version": 2,
  "memory_type": "entities"
}
-->