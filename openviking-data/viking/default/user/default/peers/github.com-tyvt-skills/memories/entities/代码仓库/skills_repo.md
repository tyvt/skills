# skills 仓库
D:\repository\skills 是当前会话所在的 git 仓库，存放 dsh 插件与 web profile 的受管副本。

## 结构与角色
- 仓库根目录 `D:\repository\skills`，本地 git 仓，长期存在其他会话遗留的未提交脏文件
- 各插件自带供 bundle 使用的 `cordis.patch.yml`，与 web profile 运行时的 `cordis.patch.yml` 是不同文件，不可混用
- 运行时真实配置在 `~/.dsh/profiles/web/cordis.patch.yml`（不在任何 git 仓），仓库内副本只是受管配置源

## web profile 受管副本
- 路径 `dsh/profiles/web/cordis.patch.yml`，1055 行，属"迁移到 D 盘统一管理"时期旧快照（commit 64b66a72/3373301）
- 与 live 版（1418 行）差异约 409 行：缺 preset-full-tools 与批 1 的 schedule disabled，仍含已淘汰的 composer-2.5/hy4free 模型
- 维护策略：只把每次语义改动增量补入该副本（如批 2 的 tool-workflow `disabled: true`），不做 live 全量覆盖以免裹挟历史漂移
- 提交时只用限定路径 `git add` 单文件，避免带入仓库其他脏文件


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "代码仓库",
  "name": "skills_repo",
  "source_extraction_id": "8f195b3f72104200903c651ccab8e0e2",
  "version": 1,
  "memory_type": "entities"
}
-->