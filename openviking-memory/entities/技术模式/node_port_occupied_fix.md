# 本地开发端口被 Node 进程占用时终止对应 PID 释放
Windows 本地 8081/8082 等端口被占用多为 Node.js 进程残留，结束占用 PID 的 node 进程即可释放。

## 现象
- Windows 本地 8081/8082 等端口被占用导致服务起不来
- 占用来源常在 D:/nvm/nodejs/node.exe

## 解决方案
- 用任务管理器或命令结束占用 PID 的 node.exe 进程释放端口
- 排查占用 PID 后终止对应 Node 进程即可

## 验证与归属
- 验证：004.md 会话 4568c018 解除 8081/8082 端口占用，8082 由 PID 40212 node.exe 占用已终止
- 涉及文件：(system)
- 来源会话ID：4568c018-8080-4a2c-afec-59d33e5bcd83
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "node_port_occupied_fix",
  "source_extraction_id": "da4bc13626ae49b984d5097a7818c176",
  "version": 1,
  "memory_type": "entities"
}
-->