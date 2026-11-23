- 多环境本地部署：一份 dist 按访问端口切接口目标（同源、前端零环境感知），项目×环境二维，每项目独占端口段；切换环境＝换端口，零代码改动、零 nginx 重启
- 遇到本地端口规划、后端接口代理到不同环境（本地 local/开发 dev/测试 test/客户测试 uat/生产 prod）时，直接查 deploy-env skill，不要凭空猜端口与网关
- 查询入口：`skill("deploy-env")` 加载后用 `C:\Program Files\Python310\python.exe D:\repository\skills\deploy-env\query_env.py <project> <env>`（调用前先设 `$env:PYTHONIOENCODING='utf-8'`），返回 port/frontend_url/backend_gateway/login_user/secret_ref
- 端口规则：`port = port_base + env_index`，`local=0/dev=1/test=2/uat=3/prod=4`；portal base=8090（8090/8091/8092/8093/8094），fdc-v3 base=8100（8100/8101/8102/8103/8104）
- 后端网关地址、登录账号/选择器与登录流程详见 deploy-env 的 SKILL.md；密码绝不入库，secret_ref 只存 `{{ov_privacy:deploy_env/<project>/<env>/password}}` 占位符，真实密码用 ov_privacy/privacy_resolve 解析，未补录则停止并提示补录，禁止用占位符当密码试登
- 该能力已注册到 `~/.dsh/skills/deploy-env`（junction → `D:\repository\skills\deploy-env`），实时 `available_skills` 已包含 deploy-env，README 工具分组亦有索引

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->