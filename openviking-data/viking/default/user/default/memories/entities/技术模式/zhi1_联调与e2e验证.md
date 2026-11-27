---
audit_status: valid
last_checked: 2026-11-27T07:48:55+08:00
verdict_note: 太仓物管/zhi1-web-admin package.json 命中项目名；记忆自述凭据在 Nacos 不在工作区，与本地无 shared-druid-dev 一致。
---
# zhi1 注册流程联调与 E2E 验证
zhi1-web-admin（太仓物管前端）企业注册流程改造的 dev 联调、Playwright E2E 验证环境与阻塞点。

## 联调环境
- 联调在目标 dev 分支本地进行；`.env.test` 指向 `unlimited...test`，代码分支配 dev Nacos，环境不同，以目标 dev 本地为准。
- 本机 Edge 可跑 Playwright，本地 Nginx 8099 站点已就绪（2026-11-14）。

## DBX 与 Nacos 凭据
- 任务要求照参考项目经 Nacos 接入 DBX 并完成 e2e 联调录屏；连接信息按私有配置规范取用，数据库账号直连 DBX，密码不写入日志或回复。
- `nacos.dev.zhi.com` 解析 `192.168.1.71`，目标分支为 `192.168.1.12:8848 / zscloud`；两处 `shared-druid-dev.yml` 可能指向不同库，DBX 连哪处待用户澄清。
- 后端两个服务均以 dev profile 从 Nacos 读取 `shared-druid-dev.yml`，JDBC 凭据不在 worktree；正按 bootstrap 的 shared dataId 与 namespace 重查，数据库快照与唯一性确认前不提交注册数据。
- 2026-11-14 DBX 无 OpenViking 私密引用或 Nacos dataId 连接入口，未建连接、未写注册数据；2026-11-15 仍无太仓连接，工具无法确认安全凭据引用方式，未添加连接未查库；安全凭据是真实 E2E 唯一阻塞项。
- 2026-11-15 子代理的 Nacos 检索误含一个用户名值；已停止该子代理、不复述该值、停用该组 Nacos 凭据并建议轮换，密码与 token 未报告暴露，未建 DBX 连接、未执行 SQL、未发送注册写入。
- 注册数据清理接口仅内部可调且为逻辑失效；提交时清账号与 token 均 best-effort，不保证清理成功。
- `rule_search` 未注册（Unknown tool），按技能要求暂停 DBX 写入、计划确认与代码修改并留痕。

## 验证状态
- 注册链路 5 项契约、JS 语法、限定路径 diff 检查均通过；临时账号交接与默认验证码调整后，四项契约/守卫及语法/模板检查也通过。
- 前端 UI、构建到 Nginx 与截图验证已完成（2026-11-15）；真实 E2E 仍需安全 DBX 连接与可验证清理方案。
- 计划已补 Playwright 安装/测试、nginx 部署与视频产物，保存原型首屏、登录、续填截图基线；按 `tdd` 与 `web-deploy` 技能推进，E2E 数据库快照与清理仍需先解决 DBX 凭据安全传递。

## 归属
- 所属项目：zhi1-web-admin（太仓物管前端）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi1_联调与e2e验证",
  "source_extraction_id": "32f353e1a77f40faba0eeb7eded3ce4f",
  "version": 4,
  "memory_type": "entities"
}
-->