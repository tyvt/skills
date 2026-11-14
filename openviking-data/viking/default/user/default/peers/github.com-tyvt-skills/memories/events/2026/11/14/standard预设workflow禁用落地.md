# Summary
2026-11-14 用户授权重启 dsh web 验证后，先备份 cordis.patch.yml，再在 preset-standard 块的 tool-workflow 条目（原文件 L291-293）新增 `disabled: true`（12 空格缩进，与 name 同级）；因 standard/ptc/cordis 三处缩进与相邻内容相同导致文本匹配多次命中，最终按行号精确修改，diff 显示仅新增这一行。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 选方案 B（只裁 workflow，认掉 session_query 994 token）——8.8% 使用率且无现成切换兜底，风险不划算，先拿低风险的 848 token 落地，session_query 待后续有可切预设机制再议。
...
**assistant [peer=github.com-tyvt-skills]**: 已确认，并授权我重启 dsh web 验证。开始实施：先备份、改 profile、`--dump-config` 校验。
**assistant [peer=github.com-tyvt-skills]**: 注意：`--dump-config` 基线我已在前面 dump 过，但**改前基线需重启后开新会话实测 toolsTokens**。先做改动本身。备份 + edit。
**assistant [peer=github.com-tyvt-skills]**: 备份完成。edit 加 disabled（精确定位 L291-292 这段，需含上下文避免命中其他 tool-workflow）。
**assistant [peer=github.com-tyvt-skills]**: 该模式匹配 2 次（ptc 也有 workflow-ptc 相邻）。需更精确定位——用 L288 的 `dsh-workflow-ptc` 上下文区分（这是 standard 块内独有的前置）。看两处差异。
**assistant [peer=github.com-tyvt-skills]**: L290 是 standard 内那处（`provider: spawn` 后紧跟 L291 workflow）。用完整上下文含 L288 唯一行 `dsh-workflow-ptc` 区分。看 L286-293。
**assistant [peer=github.com-tyvt-skills]**: 用 L287-292 唯一片段（`workflow-ptc` 前缀）精确 edit。
...
**assistant [peer=github.com-tyvt-skills]**: 两处都有 `workflow-ptc`+`tool-workflow` 组合（standard 与 full-tools 都复制了）。需用更外层唯一锚点。standard 块起始 L99，full-tools L313。两者内部结构相同。我改用**行号精确读取后针对该行独特上下文**——但 edit 是文本匹配。

换思路：standard 块内 `tool-workflow` 后紧跟 `- id: tool-ask-user`（L293），full-tools 块内的可能不同。查两处 workflow 各自后一行。
**assistant [peer=github.com-tyvt-skills]**: **关键区别**：standard 块缩进 10 空格（`          - id:`），full-tools 块缩进 14 空格（`              - id:`）。所以 standard 那处缩进更浅。用含 `tool-ask-user`（浅缩进 `      - id:`）的片段精确锚定 standard。
**assistant [peer=github.com-tyvt-skills]**: 仍匹配 2 次？说明两处 tool-workflow→tool-ask-user 缩进相同。让我看 full-tools 块 L508-512 的实际缩进（前面显示是 14 空格 vs standard 10，但可能我数错）。精确对比带行号的原始空格。
**assistant [peer=github.com-tyvt-skills]**: 有 4 个 `- id: tool-workflow`（L291 sp=10, L508 sp=14, L739 sp=10, L1081 sp=10）——L739(ptc)、L1081(cordis) 也是 sp=10 且后跟同样 tool-ask-user！这就是匹配 2 次的原因。需要找到 standard（L291）独有的区分点。

standard 在 L291 是**第一个**。若用 replace_all 会改所有 3 个 sp=10 的。我要只改 L291。改用 edit 的 `old_string` 包含 **L287 workflow-ptc** 那段？但那两处也有……查 L739/L1081 前面是否也有 workflow-ptc。

用 Python 按行号精确改最稳（避免文本歧义）。
**assistant [peer=github.com-tyvt-skills]**: 改到位了：standard 块 L291 workflow 现在有 `disabled: true`（L293，12 空格缩进，与 name 同级）。现在 `--dump-config` 校验（断言 F 的静态部分）：无 entry not found、standard workflow=disabled、其余 4 处启用。

<!-- MEMORY_FIELDS
{
  "event_name": "standard预设workflow禁用落地",
  "goal": "落地配置改动",
  "summary": "2026-11-14 用户授权重启 dsh web 验证后，先备份 cordis.patch.yml，再在 preset-standard 块的 tool-workflow 条目（原文件 L291-293）新增 `disabled: true`（12 空格缩进，与 name 同级）；因 standard/ptc/cordis 三处缩进与相邻内容相同导致文本匹配多次命中，最终按行号精确修改，diff 显示仅新增这一行。",
  "ranges": "0,41-51,53-63",
  "source_extraction_id": "70396858c7dc43fd9447408f46d75136",
  "version": 1,
  "memory_type": "events"
}
-->