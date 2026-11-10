# dsh-orchestrator
DSH 本地 host 工具插件，将 LangGraph 编排器（4 个工具 + 故障转移）暴露为单一入口工具 `orchestrate`。

## 功能
- 注册 `orchestrate` 工具，子进程调用 Python JSON 桥（src/jsonbridge.py + src/api.py）
- 支持三种 op：`list` 列出工具与模型池、`tool` 单工具（带主→备降级）、`full` 完整编排（规划→分派→汇总）
- 照 mcp-gateway 模板实现，零 `@deepseek-ai/*` 依赖

## 部署
- 源码位于 D:epository\skills\dsh\orchestrator，~/.dsh/orchestrator 为符号链接
- 2026-11-10 构建并接入 DSH Web，4/4 自测通过
- `--dump-config` 确认合成 profile 树含 `id: orchestrator`；2026-11-10 用户重启后新 web 进程 pid 7380（8:47 启动）已加载插件
- 备用端口 3099 探针（pid 8364）真实启动 web profile 验证：插件加载零报错
- DSH 工具集每会话固定，不动态热加；重启前创建的会话看不到 `orchestrate`，需开新会话才可用
- dsh/orchestrator/ 与编排器项目新文件截至 2026-11-10 尚未提交 git

## 关系
- 依赖 Python 编排器项目（default-workspace/langgraph-orchestrator）；cordis.patch.yml 中 `projectDir` 指向该项目目录
- 模板来源：dsh/mcp-gateway 零依赖本地 host 插件

<!-- MEMORY_FIELDS
{
  "category": "plugin",
  "name": "dsh_orchestrator",
  "source_extraction_id": "c922281fcd3847d8ad803132e800869b",
  "version": 2,
  "memory_type": "entities"
}
-->