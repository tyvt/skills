# dsh tool-workflow 预设裁剪
dsh web 配置（cordis.patch.yml 与 dsh-web-app 的 base 块）中 tool-workflow 插件的 5 处 preset 条目及其禁用状态。

## 分布
- profile 源文件有 4 处 `- id: tool-workflow`：standard（L291，缩进 10 空格）、full-tools（L508，缩进 14 空格）、ptc（L739）、cordis（L1081）。
- `--dump-config` 输出共 5 处，多出的顶层条目（dump L650）来自 dsh-web-app 的 base 块，本身不挂主会话，禁用属正常设计。
- standard、ptc、cordis 三处缩进相同且后面都接 tool-ask-user，文本匹配会多次命中，需按行号或唯一外层锚点精确修改。

## 状态
- 2026-11-14 在 preset-standard 的 tool-workflow 下新增 `disabled: true`（12 空格缩进，与 name 同级），diff 显示仅此一行新增。
- ptc 块（L740）改动前即已有 `disabled: true`，属既有配置，非本次改动。
- full-tools、cordis 的 tool-workflow 保持 enabled，可作为兜底来源。

## 效果与校验
- 只裁 workflow 每步节省约 848 token；session_query（994 token，8.8% 使用率，无现成切换兜底）暂不裁剪。
- `--dump-config` 结果：首行 `# == @deepseek-ai/dsh-base`、无 `entry not found`、standard workflow 为 disabled:true；`applyPatch: false` 是配置项而非错误。
- 该改动仍需 live 重启 dsh web 开新会话采集 toolsTokens 基线做实测验证。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dsh_workflow_preset",
  "source_extraction_id": "70396858c7dc43fd9447408f46d75136",
  "version": 1,
  "memory_type": "entities"
}
-->