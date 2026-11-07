- 项目 repository 安装 `vconsole@^3.15.1`，因与 `@dcloudio/types` 的 peer 冲突，安装时使用 `--legacy-peer-deps`
- 在 `main.js` 通过 `#ifdef H5` 条件编译启用 vconsole，仅 `import.meta.env.DEV` 为真时初始化，避免生产构建出现调试面板
- 在接口拦截器统一打印响应：`src/request/index.js` 成功打印 `[API Response]`（url、method、data），失败且非取消请求打印 `[API Response Error]`
- `src/api/gateway.js` 成功打印 `[API Response]`（interface_id、url、data），失败打印 `[API Response Error]`
- 项目有两套 axios 实例（业务网关 + VITE_BASE_API），两处均已接入日志
- 涉及文件：main.js、src/request/index.js、src/api/gateway.js；所属项目：repository

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "vconsole调试与接口日志",
  "source_extraction_id": "e275caefd6534543abec67c4bd8c49d9",
  "version": 1,
  "memory_type": "preferences"
}
-->