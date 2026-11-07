# monorepo 根跑 vite 必 404
monorepo 仓库根直接跑 vite 返回 404，必须以 workspaces 子目录为 cwd 才能起。

## 现象与根因
- 起前端在仓库根执行 vite，访问得 404
- 仓库（门户等）声明 `workspaces:["zhi2-web-admin"]`，真正 Vite 应用在子 workspace，根无 index.html 也无正确中间件/插件配置
- Vite root 默认 cwd，根无入口 HTML 且解析不到子模块 vite.config.js（含 base、proxy、env 加载），故 404
- 子 workspace 目录下有完整配置，改 cwd 后立刻 200（HTTP 200/text/html，VITE v5.4.11）

## 启动规范
- 定位应用目录：看仓库根 package.json 的 workspaces 字段，Vite 应用通常 `<workspace>/zhi2-web-admin`
- 一律以子目录为 cwd 启动（workdir 参数），不在仓库根跑
- 端口选仓库实际约定：门户 8082（原 8081 属另一 vite 实例 pid 16764 非本项目口径应废弃），苏住房G nginx 站点 8101
- 启动后用 HTTP 状态码 + text/html 校验，确认非 404 空响应
- 核对后端服务端口别被顶掉：8080 网关、9603 data-property、9610 service-expand、9211/8720 common-framework

## 验证与归属
- 来源会话 feishu-8464c72c-f8a9-4d8a-ba49-fb88c20e2f6b（基线 6156653）最终结论「前端已启动」段
- 涉及文件：zhi2-web-admin/vite.config.js、zhi2-web-admin/package.json


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "monorepo_vite_cwd",
  "source_extraction_id": "f53177084e504b838182c24425977ff7",
  "version": 1,
  "memory_type": "entities"
}
-->