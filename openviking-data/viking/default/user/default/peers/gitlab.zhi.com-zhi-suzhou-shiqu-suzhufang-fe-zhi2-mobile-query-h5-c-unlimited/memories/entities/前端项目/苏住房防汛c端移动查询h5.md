# 苏住房防汛C端移动查询H5
面向苏住房防汛C端的移动查询 H5 项目，由 Lead 负责构建协调、产物校验与验收。

## 构建
- 生产构建命令为 `bun run build:h5`（无管道、纯参数方式）。
- 编排器的 execution 快路径通道会被拒绝，属于 P0-4 已知边界；需改用 op:"full" 明确指令要求真实执行构建。
- 2026-11-16 该构建成功执行，exit 0，构建产物时间为 11:01:39。

## 部署与产物
- 构建产物位于 dist 目录，nginx 直接读取 dist，已部署生效。
- 构建完成后需先快速校验产物新鲜度，再执行 E2E。

## 验收
- E2E 使用 package.json 中实际定义的 e2e 脚本执行，脚本名需以 package.json 为准，不能凭记忆或假设使用。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "前端项目",
  "name": "苏住房防汛C端移动查询H5",
  "source_extraction_id": "d5933c26e2e549abba10570e923a74c5",
  "version": 1,
  "memory_type": "entities"
}
-->