# tyvt/skills 仓库
GitHub 上的 tyvt/skills 仓库（本地路径 D:\repository\skills），用于存放 OpenViking 记忆快照与导入工具脚本。

## 描述
- 对应远程 https://github.com/tyvt/skills.git 的 origin/main 分支
- 本地路径为 D:\repository\skills

## 内容
- openviking-memory/ 目录存放 OpenViking 记忆库快照
- openviking-data/ 目录存放 OpenViking 的 memories 与 peers/*/memories 同步备份（约13MB，不含 sessions 与 vectordb）
- skills/scripts/ 目录含 patch-ov-cursor-evidence.mjs、fix-ov-memory-footer-order.mjs、refresh-cursor-import-state.mjs 等导入质量脚本

## 关系
- 作为 OpenViking 记忆备份与工具脚本的托管仓库
- default-workspace 下的 memory-migration/ 并非独立 git 仓库，工具脚本备份至此仓库

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "tyvt_skills",
  "source_extraction_id": "85b2659f2ed048b4b9cd65cb1ccdcdcf",
  "version": 2,
  "memory_type": "entities"
}
-->