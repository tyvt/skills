# zhi2-web-admin（惠山二期G）
房地产综合服务平台惠山物管子模块，本地路径 `D:epository\惠山二期G\zhi2-web-admin`，GitLab 项目 `gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited`。

## 仓库上下文
- 分支：develop/v2.6.2-huishan
- 本地 nginx 站点端口 8119，部署 dist
- 计划文件存放于 `.plan/` 目录（如 task2393.md）

## 工作流事实
- 禅道接口文档附件若需登录无法直接下载，可参考苏住房已实现提交移植（如 task 2104：dbd161219 + 7b937cd63）
- 惠山文件与苏住房基线差异极小时用 `git merge-file` 三方合并；整文件冲突常为 CRLF/LF 行尾差异，统一行尾后可合并
- eslint 须在 zhi2-web-admin 目录下用父仓本地 eslint 运行，父目录跑会有 16 个 alias 误报
- `npm run build` 超编排器 180s 上限，需改后台进程跑完再轮询日志

## 验证与归属
- 项目：惠山物管（惠山二期G）
- 来源会话：2026-11-12

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin_huishan",
  "source_extraction_id": "88d5b3b6d3e94e5697226f945f3b34e9",
  "version": 1,
  "memory_type": "entities"
}
-->