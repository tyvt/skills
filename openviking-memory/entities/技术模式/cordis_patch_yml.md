# cordis.patch.yml 双份配置与符号链
DSH web 的插件/编排补丁配置在现网与仓库各存一份且不同步，改动需手动重启 web 才生效。

## 现网与仓库副本
- 现网 C:\Users\Administrator\.dsh\profiles\web\cordis.patch.yml 不在 git 内
- 配置/代码/插件改动都须手动重启 web
- 仓内 dsh/profiles/web/cordis.patch.yml 落后现网约 409 行，每语义改动追加一行并单独提交该文件

## 目录与符号链
- ~/.dsh/orchestrator、~/.dsh/cost-meter 为符号链
- ~/.dsh/profiles 为独立真实目录
- ~/.dsh 下的 AGENTS.md 即工作区 dsh/AGENTS.md，受 Git 管理

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cordis_patch_yml",
  "source_extraction_id": "5662cfea31dd4b63a64b0dd7805e3a0d",
  "version": 1,
  "memory_type": "entities"
}
-->