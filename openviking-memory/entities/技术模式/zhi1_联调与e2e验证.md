# zhi1 注册流程联调与 E2E 验证
太仓物管前端 zhi1-web-admin 企业注册流程改造的 dev 联调、Playwright E2E 验证环境与阻塞点。

## 联调环境
- 联调落点为目标 dev 分支本地；`.env.test` 指向 `unlimited...test`、代码分支配 dev Nacos，两者环境不同，以目标 dev 本地为准。
- 本机 Edge 已能运行 Playwright，指向本项目本地 Nginx 8099 站点已就绪（2026-11-14）。

## DBX 与 Nacos 凭据
- 原始要求：照参考项目 Nacos 配置接入 DBX，完成完整 e2e 联调测试并生成录屏；按私有配置记录的使用规范取 Nacos 连接信息，数据库账号直接用于 DBX 连接，密码不写入日志或回复。
- 用户提供的 `nacos.dev.zhi.com` 解析 `192.168.1.71`，与目标分支 `192.168.1.12:8848 / zscloud` 不同；两处 `shared-druid-dev.yml` 可能指向不同数据库，DBX 连哪处待用户澄清。
- 正按后端 bootstrap 的准确 shared dataId 与 namespace 重查配置，数据库快照与唯一性确认完成前不提交注册数据。
- 2026-11-14：DBX 侧确认没有支持 OpenViking 私密引用或 Nacos dataId 的连接入口，故未创建连接、未执行任何注册写入；安全凭据路径仍是后续 E2E 的唯一阻塞项。
- `rule_search` 未注册（返回 Unknown tool），按技能要求暂停 DBX 写入、计划确认与代码修改并如实留痕。

## 验证状态
- 前端注册链路 5 项契约检查、JS 语法检查、限定路径 diff 检查均通过；临时账号交接与默认验证码调整完成后，四项契约/守卫及语法/模板检查通过。
- 前端基线构建在后台运行，下一步重跑测试、构建到 Nginx 并检查改后截图。
- 计划已补 Playwright 安装/测试、nginx 部署与视频产物，并保存原型首屏、登录和续填的截图基线。
- 按 `tdd` 与 `web-deploy` 技能推进；E2E 的数据库快照与清理仍需先解决 DBX 凭据的安全传递。

## 归属
- 所属项目：zhi1-web-admin（太仓物管前端）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi1_联调与e2e验证",
  "source_extraction_id": "e9d50e5b4dce42e5a8093972c979d958",
  "version": 1,
  "memory_type": "entities"
}
-->