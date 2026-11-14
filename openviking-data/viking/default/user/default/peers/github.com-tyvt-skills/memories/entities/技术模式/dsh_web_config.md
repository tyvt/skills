# DSH Web 预设与配置分层

DSH Web 的预设与配置通过多层 patch 文件合并、后层覆盖前层生效，用户维护 preset-standard 等预设。

## 配置结构
- 真实 `preset-standard` 定义在 `dsh-web-app/presets/standard.patch.yml`（insert 挂载）
- 分层顺序：`bundles[].patch` 先，用户 `cordis.patch.yml` 最后（优先级最高）
- `~/.dsh/profiles/web/cordis.patch.yml` 不在 git 版本控制，改动以 `.bak-<tag>-<ts>` 备份作为回滚点

## 已知陷阱
- 新增预设须用 `insert:` 声明，裸 `- id:` 只能覆盖已有条目，否则被 `entry not found` 静默跳过（preset-full-tools 初次失败的根因）；重做后 `--dump-config` 组合树正确，实机新会话断言 A–E 待重启后跑
- 判断配置是否生效要看 `--dump-config` 组合树与新会话工具表，不能只看 `cordis.patch.yml` 的 mtime（DSH Web 启动会归一化重写该文件）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "dsh_web_config",
  "source_extraction_id": "4fa61fcf496144728c4dd04547bf77da",
  "version": 1,
  "memory_type": "entities"
}
-->