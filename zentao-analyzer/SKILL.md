---
name: zentao-analyzer
description: 禅道 Bug/任务分析与回写。给定一条禅道链接（如 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=5988），拉取详情、定位前端代码根因、修复并验证，最后可回写状态为已解决。也可用于批量查询禅道 bug/任务、生成周报。
---

# 禅道分析与回写（zentao-analyzer）

## 决策树（先看这里；细节文件按需 read，不要一次全读）

1. **环境**：只操作**新禅道** `http://zentao-biz.zhi.com`；查询/回写默认走 MCP `dbx`（连接名「新禅道」，`192.168.1.87:13306`，db `zentao`）；老禅道库禁止写（ID 空间重叠）。
2. **拉详情** → read `DBX.md`「取详情」。**开工第一步先读 `zt_action` 备注**：后端接口变更全在 comment 里，只看 steps 会整轮作废（事故见 `CASES.md`）。
3. **取截图/附件** → 本文件下方「取截图/附件」。Web 登录被强制改密挡死，必须走 REST Token。**看图默认用 `mcp__magpie-vision__analyze_image`（返回 1-2k 文字描述），不要用 `read_image`**——图片 attachment 打穿 prefix cache，后续所有 step 全价计费（bug6401 一张截图 43k）。
4. **回写状态** → read `DBX.md`「回写」：事务化 `UPDATE zt_bug` + `INSERT zt_action`，提交后复核落库。
5. **定位页面**：按截图的菜单名/按钮文案反查路由，**禁止按方法名猜**；改完全仓 grep 旧接口路径。事故细节见 `CASES.md`。
6. **任务信息不足**：查父任务（`parent`）与需求（正文在 `zt_storyspec.spec`）；跨项目参照用 `git log --grep`。
7. **开工前置**：`git worktree list` + **父仓与每个子模块都各跑一次** `git -C <仓> worktree list`（flood 等 bug 代码常在子模块的 worktree 里，父仓列表看不到）+ 各 worktree `git status --short` 一次做完；用户指定落点是硬约束，不进他人 worktree（详见本文件末「开工前置」）。
8. **临时文件**（截图、导出物）统一落 `<repo>\.tmp-bug<id>\`，不落仓库根，不提交。
9. **凭据**（密码等）只在脚本内部读取，不要把明文读进会话上下文。
10. **DBX 报错自愈与逐条禁忌** → read `DBX.md`「手册」；每条最多重试一次。

## 取截图/附件（REST API，绕开强制改密）

Web 登录任何请求都被 302 到「修改密码」页；用 **禅道 REST v1 Token** 直接下二进制。

**前置**：DBX 查附件真实 `fileID`：`SELECT id,title,pathname,size FROM zt_file WHERE objectType='bug' AND objectID=<bugID> ORDER BY id;`

**取 Token**（密码传**明文**，服务端自己 md5；账号用 bug 相关人，密码只在脚本内读取，不要读进会话）：

```powershell
$base = "http://zentao-biz.zhi.com"
$body = @{ account='<工号>'; password='<明文密码>' } | ConvertTo-Json
$r = Invoke-WebRequest -Uri "$base/api.php/v1/tokens" -Method Post -Body $body -ContentType 'application/json' -UseBasicParsing
$tok = ($r.Content | ConvertFrom-Json).token     # HTTP 201
```

**下载附件**（Header 名是 `Token`）：

```powershell
$hd = @{ 'Token' = $tok; 'Accept' = 'application/json' }
$r = Invoke-WebRequest -Uri "$base/api.php/v1/files/<fileID>" -Headers $hd -UseBasicParsing
$bytes = $r.RawContentStream.ToArray()
$out = Join-Path "<repo>\.tmp-bug<id>" "bug<id>.png"   # 临时目录统一 .tmp-bug<id>/
if ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50) { [IO.File]::WriteAllBytes($out, $bytes) }
```

- 端点 `GET /api.php/v1/files/<fileID>` → `200 application/octet-stream`；**用不带 `/download` 的端点**。`/api.php/v1/bugs/<id>` 返回 JSON 不含图片二进制。
- 拿到图片先用 `mcp__magpie-vision__analyze_image` 看文字描述，不足再 `read_image` 读原图（一张图 ≈ 43k 且打穿后续每步缓存，bug6401 实测）。多张附件先看业务页，再看角色或权限页。
- 库里 `zt_user.password` 是 `md5(明文)` 的 32 位哈希；只知道 hash 就换能拿到明文的账号，别暴力猜。
- **别去 DB 容器 `LOAD_FILE` 读上传目录**：DB 与禅道 Web 是两个容器，路径全对不上。

## 标准流程（修 bug 闭环）

0. 先定落地位置（见下「开工前置」）。
1. 取详情：DBX 查 `zt_bug` + `zt_action` 备注（见 `DBX.md`）。
2. 定位根因：先判代码归属项目（监测V3 = `zhi3-web-admin-...`，门户 = `zhi2-web-admin-...`；用 `.env`/`VITE_APP_PROXY_ADDRESS` 确认），再按截图反查组件。**列宽/截断类（及显隐、单字段）走 3 步标准流程，不读截图**：`grep "label: '<列名>'"` 定位行号 → `read offset/limit` 只读目标方法 → `edit` 宽度（bug6401：43k 截图 + 20k 整读本可全免）。
3. 修复 + 验证：改源码 → 窄验证（单文件 `npx eslint <file>`，不要全量 lint 回灌）→ 本地 nginx 站点部署（监测V3 8098 / 门户 8099）→ 核对 dist 已加载新构建。
4. 提交推送：子模块先提交推送 → 父仓库 gitlink **先判后动**：`git submodule status` 看 parent 的子模块是否 `+`（指针变化），是才 `git add`，否则跳过并说明（bug6401 先 add 后分析，空转一轮）；只暂存本次改动，勿夹带 `env/.env` 等本地文件。
5. 回写禅道：见 `DBX.md`「回写」。
6. 收尾自查：跑 token-optimizer 看等效成本与未命中 TOP；未验收（构建/部署/回写证据没齐）不收尾。

## 开工前置：落地位置与并行任务（强制）

1. 开工前一次做完（**父仓与每个子模块各跑一遍**，子模块的 worktree 在父仓列表里看不到——bug6369 因此空转 8 步）：
   ```powershell
   git worktree list; git submodule status
   git -C zhi2-web-admin worktree list      # 每个子模块各一次
   git status --short; git -C zhi2-web-admin status --short
   git -C <每个 wt> status --short; git -C <每个 wt> log --oneline -3
   ```
2. 用户指定的落地位置是硬约束：明确豁免 worktree 时直接在主工作区改，不进/不改/不合并那个 worktree，也不拿它的未提交文件当基线。
3. 目录存在性先 `Test-Path`：别的任务新建的目录往往只存在于那个 worktree；不存在就按本任务新建自己的路径。
4. 新需求用新路径、新菜单，不复用他人正在改的同名目录。
5. 收尾对账：`git worktree list` 与开工前一致；改动归属逐条说清（哪个 worktree / 分支 / 提交）。

## 常用脚本

| 脚本 | 作用 |
| --- | --- |
| `zentao_fetch.py` | 拉单个 bug/任务/需求详情（要登录，已被强制改密挡住；拉详情直接用 DBX，见 `DBX.md`） |
| `zentao_resolve.py` | Web 表单回写（已不可用，仅参考；默认 DBX 回写） |
| `yapi_fetch.py` | 从 YApi 拉接口定义辅助核对字段 |
| `zentao_html.py` | 抓取的禅道 HTML 转纯文本 |
