---
name: deploy-env
description: 多环境 dist 端口切换与凭据查询。给定 project+env，从 registry.sqlite 取端口/前端URL/后端网关/账号/密码引用，resolve 密码后用 agent-browser 登录目标环境。当「按环境切换端口、查某项目某环境的访问地址、自动化登录某环境后台」时使用。
---

# deploy-env — 多环境部署查询与登录

一份 `dist` 按访问端口切接口目标（同源、前端零环境感知）。项目 × 环境二维，每项目独占端口段；切换环境＝换端口，零代码改动、零 nginx 重启。

## 目录与数据
- `registry.sqlite`：`env_registry` 表，字段 `project/env/port/port_base/dist_root/backend_gateway/frontend_url/login_user/login_selector/secret_ref/status/updated_at`；`UNIQUE(project,env)` + port 唯一索引。
- 端口规则：`port = port_base + env_index`，`local=0/dev=1/test=2/uat=3/prod=4`。
  - portal: base=8090 → 8090/8091/8092/8093/**8094**
  - fdc-v3: base=8100 → 8100/8101/8102/8103/**8104**
- `env-sites/*.conf`：`gen_nginx_sites.ps1` 由注册表生成的 nginx 片段（每 project×env 一个 `server{}`），顶层 include 到各项目 `deploy/nginx.conf`。
- **密码绝不入库**：`secret_ref` 只存占位符 `{{ov_privacy:deploy_env/<project>/<env>/password}}`；`login_user`/`login_selector` 本轮为空占位、不补录。

## 查询流程（project + env → 连接信息）
调用查询后端，返回 UTF-8 JSON（含 port/frontend_url/backend_gateway/login_user/secret_ref/secret_ref_path/password_resolved/password）：

```
$env:PYTHONIOENCODING='utf-8'
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-env\query_env.py' <project> <env>
```

- `query_env.py` 只读注册表，按 `project`+`env` 精确取一行；查不到返回 `{"error": ...}` 且退出码 1。
- `resolve_password()` 仅从 `secret_ref` 解析出隐私路径 `deploy_env/<project>/<env>/password`；本轮 `login_user` 为空 → `password_resolved=false`、`password=null`，**不返回任何假密码**。

## 登录流程（resolve 密码 → agent-browser）
1. 取连接信息：`frontend_url`（登录入口）、`backend_gateway`、`login_user`。
2. resolve 密码：把 `secret_ref_path`（`deploy_env/<project>/<env>/password`）交 OpenViking/ov_privacy 取真实值；未补录则停止并提示补录，禁止用占位符当密码试登。
3. 用 `agent-browser` 打开 `frontend_url`，按 `login_selector`（JSON，含用户名/密码/提交按钮选择器）填 `login_user` + 解析出的密码并提交；登录后核验跳到后台页。
4. 切换环境＝换 `frontend_url` 端口重开浏览器，无需改代码或重启 nginx。

## selftest（两例）
```
$env:PYTHONIOENCODING='utf-8'
& 'C:\Program Files\Python310\python.exe' 'D:\repository\skills\deploy-env\selftest.py'
```
预期：`portal/test -> port=8092 url=http://localhost:8092`、`fdc-v3/prod -> port=8104 url=http://localhost:8104`，末行 `SELFTEST PASS (2/2)`。

## 约束
- 调 Python 子进程读中文前必须设 `$env:PYTHONIOENCODING='utf-8'`（Windows 默认 GBK 会乱码）。
- 无 sqlite3 CLI，用 `C:\Program Files\Python310\python.exe` 内置 sqlite3。
- 本机 `nginx` 未在 PATH（`Get-Command nginx` → NOT_FOUND），但装在 `D:\nginx\nginx.exe`（v1.27.0）。`nginx -t` 已实测通过：两项目 `deploy/nginx.conf` 是 conf.d 片段（无 `http{}` 包裹，`upstream` 位于文件顶层属正常），直接 `-c <中文路径>` 会因 Windows nginx 不支持中文路径 + 缺 prefix 报错；正确测法＝把 conf 复制到 TEMP 纯 ASCII 路径、外包 `http{}` 骨架、`nginx -p D:\nginx -c <wrap> -t`，两份均 `test is successful`。片段已生成、顶层 include 已写。
