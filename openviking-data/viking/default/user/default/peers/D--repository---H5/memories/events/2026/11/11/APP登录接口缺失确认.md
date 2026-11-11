# Summary
2026-11-11，核查后端仓库 zhishu/portal 的 dev/main 及远端分支，确认 APP 登录文档（禅道 1431）要求的 4 个接口 /v3.0/portal/appLogin/{captcha,sms,login,apps} 均未实现（无任何控制器），仅 /v3.0/portal/sso/jump 已实现（入参 {token, appId, targetUrl?}，返回 redirectUrl）；现有登录仅 /v3.0/portal/login/login 账号密码。后端未就绪，无法做完整 e2e 联调。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=D--repository---H5]**: 看下本地的后端仓库，拉下最新代码，如果后端代码就绪了，本地e2e联调一下
...
**assistant [peer=D--repository---H5]**: Pulled latest (fast-forward to `1ea8f4d`). Now the key question: does the backend have the `appLogin` endpoints? The doc says 禅道 1431. Let me search the backend source for `appLogin` / `sso/jump`.
**assistant [peer=D--repository---H5]**: Those `appLogin` hits are from the generic app-auth token framework, not the portal APP login endpoints. I need to find the actual controller for `/portal/appLogin`. Let me search specifically for controller mappings.
**assistant [peer=D--repository---H5]**: No `appLogin` controller in `common-portal`. Let me check what portal controllers exist and confirm the current login controller path.
**assistant [peer=D--repository---H5]**: There's no `/v3.0/portal/appLogin/*` controller and no `/portal/sso/jump`. There IS `/v3.0/portal/auth/app-token` (generic app token) and `/v3.0/portal/login/login` (PC login). Let me confirm there's genuinely no appLogin module and check the login controller, plus look for any 禅道 1431 related commit/branch.
**assistant [peer=D--repository---H5]**: There's a commit `43737de` mentioning "SSO 跳转逻辑... Ticket" but that's on another branch (likely `main` or elsewhere), not `dev`. The `dev` branch we're on **does not have** the `/v3.0/portal/appLogin/*` endpoints. Let me check which branch `43737de` is on and whether it contains appeLogin.
**assistant [peer=D--repository---H5]**: `dev` contains `43737de` and it's also on `main` (which is ahead with `dde0b66`, `a6827c2`). The `appLogin` hits even on main are only the generic app-auth framework, NOT the portal APP-login controller with `{phone, idNumberSuffix, smsCode}`.

So the backend **does not yet implement** the APP-login doc endpoints (`captcha/sms/login/apps/sso/jump`). Let me verify definitively by checking `main` for the specific controller and the SSO jump endpoint, and inspect the login controller to see what exists.
**assistant [peer=D--repository---H5]**: PowerShell quote issue. Let me use the grep tool on the working tree after checking out, or use git grep with simpler pattern.
**assistant [peer=D--repository---H5]**: Confirmed: **neither `dev` nor `main` implements the APP-login doc endpoints.** The backend is NOT ready for the doc I integrated.

Let me gather concrete evidence of what *does* exist (the current login controller and SSO) so I can report precisely what's missing vs. present.
**assistant [peer=D--repository---H5]**: There IS an `sso` package with `SsoController` and `JumpReqDto/JumpRespDto`. Let me read the SsoController to see the actual jump endpoint path, and check the login-methods / login service for whether SMS/three-factor is supported.
**assistant [peer=D--repository---H5]**: `/v3.0/portal/sso/jump` **exists** with `{token, appId}` — matches my frontend `jumpToPortalApp` (I send `{appId, token}`, extra `targetUrl` optional).

So the SSO jump side is ready. What's missing is `/v3.0/portal/appLogin/{captcha,sms,login,apps}`. Let me confirm the login service doesn't support SMS/phone and check `login-methods` to see if there's a phone/SMS method, plus check `JumpRespDto` field name (`redirectUrl`?).
**assistant [peer=D--repository---H5]**: Confirmed with hard evidence. Let me do a final consolidated check of the backend readiness and whether there's any branch/WIP for 禅道1431, then report.
**assistant [peer=D--repository---H5]**: Definitive conclusion. Let me update my todos and report. The APP-login endpoints do not exist on any branch — only the generic app-auth framework matches, no `@RequestMapping`/`@PostMapping` controller.
**assistant [peer=D--repository---H5]**: 已拉取后端最新代码并核查完毕，结论是：**后端尚未就绪，无法进行文档所需的 APP 登录 e2e 联调。**

## 后端仓库现状

- 仓库：`D:\repository\门户后端`（`http://gitlab.zhi.com/zhishu/portal.git`），当前分支 `dev`。
- 已 `git pull` 快进到最新 `1ea8f4d`（`2db058e..1ea8f4d`），工作区干净，无冲突/脏文件。
- 分支情况：本地 `dev`/`main`，远端 `origin/dev`、`origin/main`；`dev` 已包含 `main` 的「门户统一登录」系列提交（含 `43737de` SSO Ticket 重构）。

## 逐接口核对（对照我做的前端 5 个接口）

| 文档接口 | 后端状态 | 证据 |
|---|---|---|
| `POST /v3.0/portal/appLogin/captcha` | ❌ 未实现 | 全分支无此 controller |
| `POST /v3.0/portal/appLogin/sms` | ❌ 未实现 | 同上 |
| `POST /v3.0/portal/appLogin/login`（手机号+身份证后4位+短信码） | ❌ 未实现 | 现有是 `/v3.0/portal/login/login`，入参仅 `{userName, password}`（账号密码，无短信/身份证后4位/验证码） |
| `POST /v3.0/portal/appLogin/apps`（子系统列表+authorized） | ❌ 未实现 | 无此 controller |
| `POST /v3.0/portal/sso/jump` | ✅ 已实现 | `SsoController`，入参 `{token, appId, targetUrl?}`，返回 `redirectUrl` |

关键事实：
- 在 `dev`、`main` 及所有远端分支上，`appLogin / captchaUuid / idNumberSuffix` 的命中**全部只来自通用 app-auth 框架**（`AppAuthServiceImpl`、`TokenService` 等），**没有任何 `@RequestMapping`/`@PostMapping` 的 appLogin 控制器**。
- 现有登录仅支持账号密码（`PortalLoginServiceImpl` 里 `phone` 只作为账号候选查询字段，不是短信登录）。
- 只有 SSO 跳转（`/sso/jump`、`/ticket/verify`、`/verify`）是就绪的，且返回字段名 `redirectUrl` 与前端封装一致。

## 结论与建议

后端**只完成了 SSO 跳转这一半**，APP 三重登录（图形码/短信/三重校验/子系统列表）的 4 个接口在 `dev`/`main` 均不存在——`禅道 1431` 的后端代码还没合入或还没写。因此**现在无法做完整 e2e 联调**（登录第一步 captcha 就会 404）。

请确认下一步怎么走：

<!-- MEMORY_FIELDS
{
  "event_name": "APP登录接口缺失确认",
  "goal": "核查APP登录就绪",
  "summary": "2026-11-11，核查后端仓库 zhishu/portal 的 dev/main 及远端分支，确认 APP 登录文档（禅道 1431）要求的 4 个接口 /v3.0/portal/appLogin/{captcha,sms,login,apps} 均未实现（无任何控制器），仅 /v3.0/portal/sso/jump 已实现（入参 {token, appId, targetUrl?}，返回 redirectUrl）；现有登录仅 /v3.0/portal/login/login 账号密码。后端未就绪，无法做完整 e2e 联调。",
  "ranges": "0,12-43",
  "source_extraction_id": "386298adea1b4f94b2514d44437fffb3",
  "version": 1,
  "memory_type": "events"
}
-->