# cordis.patch.yml

DSH web profile 的补丁配置文件，路径 C:\Users\Administrator\.dsh\profiles\web\，不在 git 仓库，改动后需重启 web 生效。

## 结构与机制
- 含标准、ptc、cordis、full-tools 等预设块，工具开关由 preset 决定；DSH 启动会重写归一化文件。
- 顶层禁用条目的写法为无缩进 `- id: xxx` + `disabled: true`；无 git，回滚＝改回原值并重启 web。
- 新增 preset-full-tools 作兜底，cordis/full-tools 预设的 workflow 仍为 enabled。

## 已落地改动
- 全局禁用 optional-tool-session-query：5 个 session_* 工具不再提供；会话 5d0bf922（preset=standard）实测 33 个工具、session_* 全消失、toolsTokens 6,182（原 8,025，降 1,843），移除 6 个工具约 1,867 tok/步（session_* 约 1,015 + workflow 852）。
- standard 预设禁用 tool-schedule、tool-goal、tool-workflow（批 2 在 tool-workflow 加 disabled: true，diff 一行）。
- 2026-11-14 将技能目录描述预算 catalogDescriptionMaxLength 由 120 改为 40（第 140、355 行）：总量 15.5k→14.9k、技能注入 766→461（约 −305 token/步），零功能损失。
- 2026-11-14 在文件末尾追加 `- id: harness-dev-context` + `disabled: true`，dump 校验确认禁用生效、无真实 error；待手动重启后验收，预期系统提示 1.7k→1.1–1.2k、总量 ≈14.3k。

<!-- MEMORY_FIELDS
{
  "category": "配置文件",
  "name": "cordis_patch_yml",
  "source_extraction_id": "c1ce226d81f64754ab4e8bd1b7ab0720",
  "version": 1,
  "memory_type": "entities"
}
-->