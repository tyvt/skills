---
status: approved
human_confirmed: true
risk: medium
review_override: false
session: cursor-fast-default-api-20261116
title: 直连 API 的 cursor 请求默认 Fast（magpie 插件补丁）
approved_sha256: dbea9d3b9f6d691ef62f443c09f71e6c6d06019b02e7136b1ac07249db837631
approved_version: 2
---

# 直连 API cursor 请求默认 Fast

## 一、前因后果
- 编排器侧已对 grok 两池默认 Fast（7b0456fe）；用户要求直连 3425 网关的所有 cursor 请求也默认 fast——即请求未带 service_tier 时插件默认开 fast。

## 二、已核验事实
- E1 锚点行在两份运行副本中唯一：0.2.48 `index.mjs:3601`、.config 0.2.32 `index.mjs:3077`，均为 `const fast = tier === "priority" || tier === "fast" ? true : tier ? false : undefined`；仅请求未带 service_tier 时为 undefined（index.mjs:3600）。
- E2 fast 落点 `index.mjs:1210`：`if (entry.fast)` 才写 want.fast——mini/deepseek-v41 无 fast 档（上轮 E2），默认开对它们不生效（无害）。
- E3 显式传非 fast tier（如 "default"/"flex"）时 tier 真值 → false，保持关——补丁只影响「未带 tier」的请求。
- E4 补丁基建：`dsh/patches/cursor-batch-sealed/patch-batch-sealed.mjs` 多目标模式（.config 副本 + install-cache 全版本化目录，apply/--check/--restore/首run备份）；`cursor-quiet/reapply.mjs` 每追加一个 apply 块即被 5 分钟计划任务自动覆盖未来升级。
- E5 补丁须重启 magpie-bun（plugin-host）内存才生效（batch-sealed 复盘）。

## 三、实施方案
| 步骤 | 落点 | 改动 | 验证 |
|---|---|---|---|
| 1 | 新建 `dsh/patches/cursor-fast-default/patch-fast-default.mjs` | 多目标文本补丁，目标=两份副本的 `index.mjs`：①`~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/index.mjs` ②`~/.cache/magpie/bun/install-cache/@magpie-community/opencode-cursor-auth@<ver>@@…/index.mjs`（动态枚举）。锚点 `const fast = tier === …: undefined` 替换前断言每文件恰好 1 次；→ `let fast = …: undefined; if (fast === undefined) fast = true; /* [cursor-fast-default] */`（首 run 备份 `index.mjs.orig-fast-default`，已有备份不覆盖；--check/--restore，幂等） | node --check + 自测 |
| 2 | 新建 `fast-default.test.mjs` | node:test：临时文件 apply 断言标记与默认真值；二次 apply 幂等（不重复注入）；restore 还原 pristine；缺锚点文件拒绝且不写；已有备份不覆盖 | node --test |
| 3 | 新建 `README.md` | 用法、回滚、局限（无法从外部观测 wire 上 fast，以补丁路径+无破坏为准）一句话 | — |
| 4 | `dsh/patches/cursor-quiet/reapply.mjs` | 追加 applyFastDefault try/log 块；接线异常记 log 且置非零退出码（不静默吞） | node --check |
| 5 | 实际打补丁 + 重启 magpie-bun | 两目标 patched；plugin-host 重载 | --check exit 0；/v1/models 200 |

## 四、验证计划
- `node --test dsh/patches/cursor-fast-default/fast-default.test.mjs`
- `node patch-fast-default.mjs --check` 全 patched exit 0
- 重启门禁顺序：先 `node patch-fast-default.mjs --check` 须全 patched exit 0；**失败即 --restore 并中止重启**，不带病重启。
- 重启后 `curl http://127.0.0.1:3425/v1/models` 200，且不带 tier 的 chat 请求正常返回
- 局限：fast 是否上 wire 无法从外部观测（插件无参数日志），以补丁代码路径 + 无破坏为准，README 同步写明。

## 五、范围
- 改：magpie 插件 index.mjs（.config + install-cache 版本化副本，补丁方式不改仓内源）；skills 仓新增 `dsh/patches/cursor-fast-default/`、reapply.mjs 接线。
- 不改：编排器代码、settings.yaml、magpie 其他插件、Cursor 客户端行为。
- 回滚：`node patch-fast-default.mjs --restore` + 重启 plugin-host；skills 仓变更 git revert。

## 六、提交
- 提交 `538f35d9`（含计划文件 + 补丁目录 + reapply 接线）；push 随 github 连通性恢复后补推（连同上轮 `7b0456fe`）。
