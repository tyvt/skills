# tyvt/skills 仓库
GitHub 上的 tyvt/skills 仓库（本地路径 D:\repository\skills），用于存放 OpenViking 记忆快照与导入工具脚本。

## 描述
- 对应远程 https://github.com/tyvt/skills.git 的 origin/main 分支
- 本地路径为 D:\repository\skills

## 内容
- openviking-memory/ 目录存放 OpenViking 记忆库快照
- openviking-data/ 目录存放 OpenViking「所有影响记忆质量」的数据备份：viking/.../user/default/ 整树（memories、peers、sessions、skills、resources、privacy、摘要）、vectordb/ 与 backend_meta.json；初始提交 1a4a1b9 仅含 memories+peers（约11.36MB/7213 md），2026-11-07 扩展为全量质量快照 4cdcd7bf（约213MB/20154 文件），2026-11-09 09:01 提交 c9a15051「全量快照 20237 files」；同日经独立验证的全量快照 dc290366（21,050 文件/214MB，含 4,359 原始导出文件）与记忆快照 605e1435（6,609 md/8.49MB）推上 origin/main 并确认 local HEAD == origin/main，取代 c9a15051 成为最新；sessions/ 含 505 个目录（其中 277 个为 mm-* 导入记忆会话）；该备份为手动时间点快照（无定时备份任务）非自动化；原始对话文本（cursor/workbuddy/opencode）位于 memory-migration/out/（本地磁盘），本不入 OpenViking；2026-11-09 曾临时拷入 openviking-data/source-exports/ 并随数据快照 dc290366 推上 GitHub（4,359 文件/240.2MB），但因违反纯镜像约定，用户同日决定迁出为独立顶层 memory-migration-archive/ 并由专门快照脚本备份；仍不入库 data/_system/、锁文件、pending/、state/ 等运行时数据
- skills/scripts/ 目录含 patch-ov-cursor-evidence.mjs、fix-ov-memory-footer-order.mjs、refresh-cursor-import-state.mjs 等导入质量脚本

## 关系
- 作为 OpenViking 记忆备份与工具脚本的托管仓库
- default-workspace 下的 memory-migration/ 并非独立 git 仓库，工具脚本备份至此仓库

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "tyvt_skills",
  "source_extraction_id": "5f0deedf3a1348f0950086f0dbf8d58a",
  "version": 5,
  "memory_type": "entities"
}
-->