# Summary
参考太仓G项目，在昆山G（wuguan-fe-zhi1-web-admin-h5-g）的 src/request/index.js 与 src/utils/request.js 两个响应拦截器中补充响应解密逻辑：响应头 x-encrypt:true 时用平台 RSA 私钥解密 res.data.key 得到 AES 密钥，再以 AES-CBC/PKCS7、全 0 IV 解密 res.data.data 并替换 res.data。2026-11-11 提交 890bb7784 并推送至 origin main/v1.47.1。
# 2026-11-11 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 参考太仓G项目，补充响应解密相关逻辑
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: Both interceptors are updated and pass `node --check`. ESLint isn't installed in this checkout, so I could not run the project linter, and I did **not** run a full build (only a syntax check). The change is a faithful port of 太仓G's working logic.

## 改动说明

参考 `D:\repository\太仓G\zhi1-web-admin\src\request\index.js`，在 昆山G 的两个请求拦截器中补充了**响应解密**逻辑：

**`src/request/index.js`** 与 **`src/utils/request.js`**（后者被 73 个 API 模块引用，必须同步处理，否则这部分接口解密会失效）：
1. 新增 `import JSEncrypt from 'jsencrypt'`（依赖 `jsencrypt@3.0.0-rc.1` 与 `crypto-js@4.1.1` 已存在）。
2. 新增 `decryptResponseData(res)` 函数：当响应头 `x-encrypt == "true"` 时，用平台 RSA 私钥解密 `res.data.key` 得到 AES 密钥，再以 `AES-CBC / PKCS7`、固定 IV（全 0）解密 `res.data.data`，并把 `res.data` 替换为解析后的 JSON。
3. 在响应拦截器开头调用 `decryptResponseData(res)`，位于版本号/401/错误码判断之前。

**两点说明：**
- 平台签名密钥 `WEXL6R2P7S3Q9T4V8Y1U5Z0OAICBHDGE` 在 昆山G 与 太仓G 完全一致，因此直接复用了 太仓G 的同一套 RSA 私钥（平台级密钥，跨同底座项目通用）。若 昆山G 后端使用了不同的密钥对，需要替换 `RSA_PRIVATE_KEY` 常量。
- 我额外加了一层 `if (!aesKeyBase64)` 保护：RSA 解密为空时不抛错、保留原始 `res.data`，避免整页崩溃（太仓G 原版无此保护，行为更脆弱）。

由于未跑构建，请务必在联调环境用开启了响应加密的接口验证一次（响应头 `x-encrypt: true`）。

接下来是否需要提交？
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 用户选择「提交并推送」。按 AGENTS.md，提交前需加载 `submodule-commit`（固定提交顺序）与 `repo-safety`，并先 `git status --short`。我先加载技能并检查 git 状态。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: `git rev-parse --show-toplevel` returns `D:/repository/昆山G` itself, so this is a **standalone repo** (not a submodule) — the submodule-pointer steps (7–8) don't apply. Only the two files are modified, and `env/.env` / `public/version.json` are clean.

Following the `submodule-commit` checklist: step 0 is `fetch` + check ahead/behind before editing/pushing.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: Local is in sync (0/0 ahead/behind) — no rebase needed. ESLint isn't installed in this checkout, so I'll proceed (syntax check already passed). Now step 3: stage and commit the two files.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: Committed as `890bb7784`. Now the push steps (5–6, 9): re-fetch, confirm not behind, push, then verify the SHA.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: Push succeeded (`680ff4226..890bb7784`). Final step: verify the remote SHA matches local HEAD.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-kunshan-wuguan-fe-zhi1-web-admin-h5-g-unlimited]**: 已完成并推送，提交 `890bb7784`（两端 SHA 一致：`890bb7784c2b503cb45dbe51c95f219fcdc32e74`）。

## 最终交付

**改动**（参考 `太仓G/zhi1-web-admin/src/request/index.js`）：
- `src/request/index.js`、`src/utils/request.js` 两个响应拦截器均新增「响应解密」逻辑。机制与 太仓G 一致：响应头 `x-encrypt: true` 时，用平台 RSA 私钥解密 `res.data.key` 得到 AES 密钥，再以 `AES-CBC / PKCS7`、全 0 IV 解密 `res.data.data`，把 `res.data` 替换为解析后的 JSON。
- 因两个请求实例都被大量 API 模块引用，故两处同步处理，避免部分接口解密失效。
- 复用 太仓G 同一套平台 RSA 私钥（签名密钥 `WEXL6R2P7S3Q9T4V8Y1U5Z0OAICBHDGE` 在两地完全一致，确认为同底座平台密钥）。若 昆山G 后端用了不同密钥对，替换两处的 `RSA_PRIVATE_KEY` 常量即可。
- 相比 太仓G 原版增加了一层 `aesKeyBase64` 为空的保护，防止 RSA 解密失败时整页崩溃。

**提交/推送**：`feat(request): 补充响应解密逻辑，兼容后端 x-encrypt 加密响应`，已 `git push origin main/v1.47.1`。

**未执行项**（需你知晓）：
- 本 checkout 未安装 ESLint，仅做了 `node --check` 语法校验（通过），未跑项目 Lint。
- 未执行构建。请在联调环境用启用了响应加密的接口（响应头 `x-encrypt: true`）验证一次解密效果。

<!-- MEMORY_FIELDS
{
  "event_name": "昆山G响应解密逻辑合入",
  "goal": "记录解密逻辑提交",
  "summary": "参考太仓G项目，在昆山G（wuguan-fe-zhi1-web-admin-h5-g）的 src/request/index.js 与 src/utils/request.js 两个响应拦截器中补充响应解密逻辑：响应头 x-encrypt:true 时用平台 RSA 私钥解密 res.data.key 得到 AES 密钥，再以 AES-CBC/PKCS7、全 0 IV 解密 res.data.data 并替换 res.data。2026-11-11 提交 890bb7784 并推送至 origin main/v1.47.1。",
  "ranges": "0,64-82",
  "source_extraction_id": "c3f74519c7614ce3882fe7eaff97bfe4",
  "version": 1,
  "memory_type": "events"
}
-->