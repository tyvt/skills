# OpenViking 长程记忆服务
OpenViking 是当前会话后台运行的长程记忆注入层，负责把历史记忆在每轮开头免检索地送进上下文。

## 基本信息
- 服务名 openviking-server（PID 9892），监听 127.0.0.1:1933
- 版本 0.5.3，`/health` 返回 healthy:true；旧记忆中的 `/debug/health`、`/observer/system` 本轮实测均 404
- 数据规模：记忆文件 6745 个、历史会话 552 个、按仓库分库的项目 peer 23 个

## 运行机制
- 每轮开头注入两类块：`source="profile"` 的目录块（约 90+ 条 preferences/entities 路径索引，末尾 +375 more / +266 more）与针对当前问题的语义召回块（本轮召回 8 条，score 0.78–0.82）
- 召回为被动注入 + 语义匹配，非主动全库排查；命中参数 scoreThreshold:0.40、recallMaxTokens:2200、recallDedupTurns:8
- 注入多为 abstract/overview 摘要，细节需再 read 对应 viking:// URI 才展开

## 接线与边界
- 插件 `@openviking/dsh-memory-plugin` 挂载于 `~/.dsh/profiles/web/cordis.patch.yml` 第 42–53 行，参数 commitTokenThreshold:8000、captureToolResults:true、recallPeerScope:actor
- 本会话 `list_mcp_resources(server="openviking")` 返回 disconnected，实际可用的是插件注入 + 服务 HTTP
- `context-mode`/`dbx` 经 `dsh-mcp-gateway` 按需拉起，是沙箱代码/缓存与禅道业务库，并非 OpenViking 本体

## 工具暴露
- A-1 改动后，openviking 24 个 mcp__openviking__* 工具已从 MCP 目录消失，改由单一 `mcp_gateway` 入口按需拉起（2026-11-13 验证：目录仅剩 mcp_gateway 1 个入口，toolsTokens 16327→9142，降 44%）
- 经 `mcp_gateway(server=openviking)` 可 list 24 工具并 write/grep/search/health 全部往返成功；首次 search 偶发 litellm embedding 冷启动 event-loop 报错，重试即恢复，与改动无关
- gateway 拉起的 openviking proxy 是独立进程，拿不到 dsh 逐会话注入的 peer，`recallPeerScope` 退化为 `all`（broad），模型主动调工具可能看到全 peer 范围；dev 单 peer 无实际泄漏，多 peer 生产环境需留意
- 故 R1 仅影响显式工具调用路径，不影响每步自动召回注入

## 链路构成（2026-11-13 复查）
- 由三条链路组成：会话镜像写入（绝对主力）、turn 开头免检索注入（profile/events/entities，有效但 profile.md 持续 404）、Agent 主动检索 search/find（延迟改善但使用频率低）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "openviking_memory",
  "source_extraction_id": "241e1d1d00734fc6bbf3a090b1d68b60",
  "version": 5,
  "memory_type": "entities"
}
-->