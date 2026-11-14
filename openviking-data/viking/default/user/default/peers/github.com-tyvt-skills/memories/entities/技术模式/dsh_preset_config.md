# DSH preset 与工具挂载配置
DSH Web 的预设与工具目录由分层 patch 配置，改动需重启并用全新会话验证。

## 配置分层与语法
- 真实 preset-standard 定义在 dsh-web-app/presets/standard.patch.yml，以 insert 挂载
- 优先级：bundles[].patch 先，用户 ~/.dsh/profiles/web/cordis.patch.yml 最后（最高）
- 新增预设必须用 `- insert:` 声明；裸 `- id:` 只能覆盖已有条目，否则被 entry not found 静默跳过（preset-full-tools 初次失败根因）

## 生效与验证
- 编排器与 DSH config 启动读死，改动需重启 DSH Web 才生效
- 判断生效看 --dump-config 组合树与新会话工具表，不能只看 cordis.patch.yml 的 mtime（DSH Web 启动会归一化重写该文件）
- 会话工具目录在会话创建时冻结：重启后恢复的旧会话仍保留旧工具表（46 工具含 schedule/goal），只有全新会话按新配置挂载
- 2026-11-14 按新写法重做后 --dump-config 组合树正确，并由全新会话 794ca361 实测 standard 预设 39 工具、schedule_*/goal 为 0

## 回滚
- ~/.dsh/profiles/web/cordis.patch.yml 不在 git 版本控制，改动以 .bak-<tag>-<ts> 时间戳备份为回滚点（如 .bak-p1a-20261114144410）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "dsh_preset_config",
  "source_extraction_id": "662ed593c73847fa9a354249db78103e",
  "version": 1,
  "memory_type": "entities"
}
-->