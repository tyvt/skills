- 打包项目时在 `index.html` 启用注释态 vConsole，并引入 BootCDN vConsole 3.15.1，以 `new VConsole({ theme: 'dark' })` 初始化。
- 该脚本须置于业务 SDK、jQuery 及主入口 `index.*.js` 之前，以捕获后续请求。
- 调试结束应注释或删除该脚本，避免正式环境暴露。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "打包项目vConsole启用配置",
  "source_extraction_id": "9d2e94c80fa6493e9412877ffdcbf45e",
  "version": 1,
  "memory_type": "preferences"
}
-->