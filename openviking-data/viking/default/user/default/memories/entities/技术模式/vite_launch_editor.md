# vite_launch_editor
苏房 zhi2-web-admin 自建 launch-editor 中间件受两个 env 开关控制，导致 Vue DevTools「在编辑器中打开」失效。
## 问题现象
- 在 Cursor 开发时，Vue DevTools 点击组件→「在编辑器中打开」无反应，控制台无报错。
- 项目未用 Vite 官方插件，而是 vite.config.js 手写虚拟插件挂载 /__open-in-editor 中间件用 child_process 执行编辑器命令。
## 根因
- 中间件被两 env 双重门控：VITE_LAUNCH_EDITOR === 'false' 时整个中间件不注册（常写成字符串 'false'，布尔判断按字符串比）；内部取 VITE_EDITOR || 'cursor'，配成未安装编辑器时命令静默失败。
- env/.env 是唯一来源，Vite 只在启动时读取，改完必须重启 dev server。
## 排查与修复
- 顺序：确认 env 里 VITE_LAUNCH_EDITOR 不是 'false'、VITE_EDITOR 是 'cursor'（cursor --version 确认 PATH）；重启 dev server；仍不行浏览器直连 http://<dev端口>/__open-in-editor?file=<绝对路径> 返回 Editor command executed 说明中间件通，用 VITE_EDITOR_COMMAND='cursor --goto "{goto}"' 覆盖默认命令。
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话 31b1bd1f 用户报无法在 cursor 打开文件，定位 env/.env 中 VITE_LAUNCH_EDITOR='false' 禁用中间件、VITE_EDITOR='trae' 指向不存在编辑器；改为 'true'/'cursor' 后修复。
- 涉及文件：zhi2-web-admin/vite.config.js、env/.env、env/.env.test、env/.env.production、package.json
- 所属项目：苏住房G；来源会话：31b1bd1f-868a-41df-9b2d-8d9b9ada1333、3a7a7b5c-0f3b-4e2f-a4c6-b3d9d30c9c69；代码基线：fb3e960
- vite.config.js 316-367 行插件按 env.VITE_LAUNCH_EDITOR !== "false" 展开，中间件取 env.VITE_EDITOR || "cursor"。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_launch_editor",
  "source_extraction_id": "a62e595feba04ff1a28335d435f6b094",
  "version": 2,
  "memory_type": "entities"
}
-->