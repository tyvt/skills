---
name: deploy-env
description: 多环境 dist 端口切换与凭据查询。给定 project+env，从 registry.sqlite 取端口/前端URL/后端网关/账号/密码引用，resolve 密码后用 agent-browser 登录目标环境。当「按环境切换端口、查某项目某环境的访问地址、自动化登录某环境后台」时使用。
---

# deploy-env — 多环境部署查询与登录

一份 `dist` 按访问端口切接口目标（同源、前端零环境感知）。项目 × 环境二维，每项目独占端口段；切换环境＝换端口，零代码改动、零 nginx 重启。

## 目录与数据
- `registry.sqlite`：
  - `projects` 表：`key/display_name/aliases/status` —— 项目身份唯一来源，`display_name` 为治理后的干净显示名（看板分组/标题只读它，不再从 dist 目录名推导）。
  - `env_registry` 表：`project_key/display_name/project/env/port/port_base/dist_root/backend_gateway/frontend_url/login_user/login_selector/secret_ref/status/updated_at`；`UNIQUE(project_key,env)` + port 唯一索引。`project_key→projects.key`。
  - `env_accounts` 表：`project_key/env/role/role_label/username/secret_ref/login_selector/sort_order`；`UNIQUE(project_key,env,role)`，一环境多角色。
  - **去重归并**：`fdc-v3`（display=苏州市房地产监测V3）含 6 env，其中 8098 原 `苏州市房地产监测V3/local` 改挂 `fdc-v3/local-8098` 保留站点；`榆林G bug6220`→`榆林G`（key=`yulin-g`）。
- 端口规则：`port = port_base + env_index`，`local=0/dev=1/test=2/uat=3/prod=4`。
  - portal: base=8090 → 8090/8091/8092/8093/**8094**
  - fdc-v3: base=8100 → 8100/8101/8102/8103/**8104**
- `D:\nginx\conf\env-sites\*.conf`：`gen_nginx_sites.ps1` 由注册表生成的 nginx 片段（每 project×env 一个 `server{}`），顶层 include 写进 `D:\nginx\conf\nginx.conf`（配置不放在本仓项目目录内）。归档片段在 `D:\nginx\conf\sites-archive\`。
- **密码绝不入库**：`secret_ref` 只存占位符；单环境账号 `{{ov_privacy:deploy_env/<project>/<env>/password}}`，多角色账号 `{{ov_privacy:deploy_env/<project_key>/<env>/<role>/password}}`。真实密码由 agent 经 ov_privacy 解析后经 `POST /api/secrets/inject` 注入看板进程内存（本地+token+白名单鉴权），**不落盘**；看板默认 `****`，点"显示"经 `POST /api/account/reveal` 取明文，未注入返回 `need_reload`。迁移脚本 `migrate_projects.py`（幂等+备份+审计）。

## 查询流程（project + env → 连接信息）
调用查询后端，返回 UTF-8 JSON（含 port/frontend_url/backend_gateway/login_user/secret_ref/secret_ref_path/password_resolved/password）：

```
$env:PYTHONIOENCODING='utf-8'
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-env\query_env.py' <project> <env>
```

- `query_env.py` 只读注册表，按 `project`+`env` 精确取一行；查不到返回 `{"error": ...}` 且退出码 1。
- `resolve_password()` 仅从 `secret_ref` 解析出隐私路径 `deploy_env/<project>/<env>/password`；本轮 `login_user` 为空 → `password_resolved=false`、`password=null`，**不返回任何假密码**。

## 复现查询流程（bug 复现先查面板，禁猜地址/账号/密码）
- 凡 bug 复现要地址、账号、密码，第一步必查面板：`query_env.py <project> <env>` 或看板 `/api/state`，取 `frontend_url`/`backend_gateway`/`login_user`/`login_selector`/`secret_ref_path`。
- 查不到（退出码 1 / `{"error":...}`）才用 `ask_user_question` 问用户；拿到后用 `agent-browser` 实机验证地址可达、账号可登录。
- 验证正确再回写（见下节），禁止用占位符当真密码试登，禁止猜端口/网关。

## 验证后回写 / 会话纠错（写回面板，单源）
- 非密字段（地址/账号/环境/端口/网关/项目名）：`upsert_env.py` 或看板 `POST /api/registry/upsert`（本机 + `X-Auth-Token`，token 见 `dashboard/.token`）；env 严格 local/dev/test/uat/prod，端口全局唯一（允许同 project/env 自更新）。
- 密码链路：`privacy_upsert(category=credential, target_key=deploy_env/<project>/<env>/<role>, values={password})` 存真实值 → 取返回的 `{{ov_privacy:...}}` 引用写入 `env_accounts.secret_ref` → `POST /api/secrets/inject` 注入看板内存；明文密码绝不入库。
- 用户在会话中指出部署信息有误（端口/网关/账号/环境/项目名），当即回写，不留到下次。
- `upsert_env.py` 幂等（SELECT+UPDATE 兜底 + 单事务写锁），无明文密码参数入口；测试用 `--db` 或 `DEPLOY_ENV_DB` 指向 `%TEMP%` 副本。

## 登录流程（resolve 密码 → agent-browser）
1. 取连接信息：`frontend_url`（登录入口）、`backend_gateway`、`login_user`。
2. resolve 密码：把 `secret_ref_path`（`deploy_env/<project>/<env>/password`）交 OpenViking/ov_privacy 取真实值；未补录则停止并提示补录，禁止用占位符当密码试登。
3. 用 `agent-browser` 打开 `frontend_url`，按 `login_selector`（JSON，含用户名/密码/提交按钮选择器）填 `login_user` + 解析出的密码并提交；登录后核验跳到后台页。
4. 切换环境＝换 `frontend_url` 端口重开浏览器，无需改代码或重启 nginx。

## 部署看板（先查再部署，禁猜地址）
- 自启：已配置为开机静默运行（计划任务 `deploy-env-dashboard`，pythonw 后台，工作目录本仓根）；手动兜底启动：`python dashboard/api.py`（绑 127.0.0.1:18098，占用退 18099，均占中止）；页面 `http://127.0.0.1:18098/`，状态 JSON `/api/state`。安装/重建自启：`powershell -ExecutionPolicy Bypass -File install-autostart.ps1`。
- **agent 接前端部署任务时，第一步查注册表**（`query_env.py <project> <env>` 或看板 `/api/state`），直接用返回的 `frontend_url`/`backend_gateway`；禁止猜端口、禁止手改 `D:\nginx\conf\sites-enabled\*.conf`。
- 看板显示三态：nginx 命中 / 空 conf / 缺 conf，以及前后端探活、最近事件（五环境固定槽位：本地/公司开发/公司测试/客户测试/生产，未部署置灰；nginx UI 已下线，站点 conf 由本仓脚本维护；`deploy_events` 表）。
- 收敛：`pwsh -File sync.ps1`（备份→生成片段→冲突感知归档→`nginx -t` 门禁→reload→退化探活回滚）；负向测试加 `-SimulateBadFragment`。
- 端口冲突 conf 一律不归档、不重生成，只在 events 记待人工；密码仍不入库，token 落 `dashboard/.token`（gitignore）。

## selftest（两例 + 看板四例）
```
$env:PYTHONIOENCODING='utf-8'
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-env\selftest.py'
```
预期：`portal/test -> port=8092 url=http://localhost:8092`、`fdc-v3/prod -> port=8104 url=http://localhost:8104`，末行 `SELFTEST PASS (2/2)`。
看板：
```
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-env\selftest_dashboard.py'
```
预期：`DASHBOARD SELFTEST PASS`（0 字节识别 / listen 解析 / 探活超时降级 / 双端口占满中止）。

## 约束
- 调 Python 子进程读中文前必须设 `$env:PYTHONIOENCODING='utf-8'`（Windows 默认 GBK 会乱码）。
- 无 sqlite3 CLI，用 `C:\Program Files\Python310\python.exe` 内置 sqlite3。
- 本机 `nginx` 未在 PATH（`Get-Command nginx` → NOT_FOUND），但装在 `D:\nginx\nginx.exe`（v1.27.0）。`nginx -t` 已实测通过：两项目 `deploy/nginx.conf` 是 conf.d 片段（无 `http{}` 包裹，`upstream` 位于文件顶层属正常），直接 `-c <中文路径>` 会因 Windows nginx 不支持中文路径 + 缺 prefix 报错；正确测法＝把 conf 复制到 TEMP 纯 ASCII 路径、外包 `http{}` 骨架、`nginx -p D:\nginx -c <wrap> -t`，两份均 `test is successful`。片段已生成、顶层 include 已写。
