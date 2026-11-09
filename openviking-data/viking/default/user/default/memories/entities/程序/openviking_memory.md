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

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "openviking_memory",
  "source_extraction_id": "fb50c21532e146739b8cc98ff0b723a2",
  "version": 2,
  "memory_type": "entities"
}
-->