# tyvt/skills 仓库
GitHub 上的 tyvt/skills 仓库（本地路径 D:\repository\skills），用于存放 OpenViking 记忆快照与导入工具脚本。

## 描述
- 对应远程 https://github.com/tyvt/skills.git 的 origin/main 分支
- 本地路径为 D:\repository\skills

## 内容
- openviking-memory/ 目录存放 OpenViking 记忆库快照
- openviking-data/ 目录存放 OpenViking「所有影响记忆质量」的数据备份：viking/.../user/default/ 整树（memories、peers、sessions、skills、resources、privacy、摘要）、vectordb/ 与 backend_meta.json；初始提交 1a4a1b9 仅含 memories+peers（约11.36MB/7213 md），2026-11-07 扩展为全量质量快照 4cdcd7bf（约213MB/20154 文件）；仍不入库 data/_system/、锁文件、pending/、state/ 等运行时数据
- skills/scripts/ 目录含 patch-ov-cursor-evidence.mjs、fix-ov-memory-footer-order.mjs、refresh-cursor-import-state.mjs 等导入质量脚本

## 关系
- 作为 OpenViking 记忆备份与工具脚本的托管仓库
- default-workspace 下的 memory-migration/ 并非独立 git 仓库，工具脚本备份至此仓库

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "tyvt_skills",
  "source_extraction_id": "d77069f405a44d43835d5fb3341af9df",
  "version": 3,
  "memory_type": "entities"
}
-->