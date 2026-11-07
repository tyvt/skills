# Summary
为苏住房防汛C端参照同类前端项目（苏住房C、考评子系统H5）约定，在 package.json 新增 install-dependencies（bun install --frozen-lockfile）、将 build/build:h5 改为 uni build --outDir ./dist 平铺输出到根目录 dist/、build:mp-weixin 输出到独立 dist-mp-weixin/；同步更新 README 与 .gitignore，于 2026-11-03 验证通过后提交并推送到 dev 分支（commit 2e42478，8e3b830..2e42478）。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 参考其他前端项目，补充install-dependency和test命令，输出dist到根目录，供CI/CD使用
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Clean — only 3 files modified: `.gitignore`, `README.md`, `package.json`. No superproject (standalone repo on `dev` branch).

Now I'll present the changes, then ask about committing/pushing per the mandatory completion rule.

**Changes summary** (参照同类前端项目 `苏住房C`/`考评子系统H5` 的约定):
- `package.json` 新增 `install-dependencies`（`bun install --frozen-lockfile`）
- `build` / `build:h5` 改为 `uni build --outDir ./dist`，H5 产物平铺输出到根目录 `dist/`
- `build:mp-weixin` 输出到 `dist-mp-weixin/`（独立目录，避免被 H5 构建 `--emptyOutDir` 清空）
- `.gitignore` 增加 `dist-mp-weixin/`
- README 同步命令说明
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 已完成，参照同类前端项目（`苏住房C`、`考评子系统H5`）的 CI/CD 约定补齐命令并验证通过。

**改动文件：** [package.json](<package.json>)、[README.md](<README.md>)、[.gitignore](<.gitignore>)

**新增/调整的 CI/CD 命令：**
| 命令 | 作用 |
|---|---|
| `install-dependencies` | `bun install --frozen-lockfile`（对齐 `bun.lock`，同类项目同名约定） |
| `test` | 单元测试（vitest，20/20 通过） |
| `build` / `build:h5` | `uni build --outDir ./dist`，H5 产物**平铺输出到根目录 `dist/`**（index.html + assets + static，可直接部署） |
| `build:mp-weixin` | 输出到独立的 `dist-mp-weixin/` |

**验证结果（完整 CI 模拟：清空 → install → test → build）：** 三步均 exit 0，`dist/` 在根目录且含 `index.html`。

**一个关键取舍：** 小程序产物没有放进 `dist/`，而是单独的 `dist-mp-weixin/`——因为 uni 的 H5 构建默认 `--emptyOutDir` 会清空整个输出目录，若小程序产物也塞进 `dist/` 会被下一次 H5 构建抹掉。这样 H5 的 `dist/` 干净供 CI/CD 部署，小程序产物互不干扰（已加入 .gitignore）。

按要求这些改动所属仓库为独立 git 仓库（`dev` 分支），需要你确认是否提交：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Committing and pushing to `dev`.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 提交并推送成功。

## 完成总结

参照同类前端项目（`苏住房C`、`考评子系统H5`）的 CI/CD 约定，为「苏住房防汛C端」补齐命令并验证、提交、推送。

**改动（dev 分支，commit `2e42478`，已推送）：**

| 文件 | 改动 |
|---|---|
| [package.json](<package.json>) | 新增 `install-dependencies`；`build`/`build:h5` 输出到根目录 `dist/`；`build:mp-weixin` 输出到 `dist-mp-weixin/` |
| [README.md](<README.md>) | 同步新命令与 CI/CD 用法说明 |
| [.gitignore](<.gitignore>) | 增加 `dist-mp-weixin/` |

**命令一览：**
- `install-dependencies` → `bun install --frozen-lockfile`
- `test` → vitest 单元测试（20/20 通过）
- `build` / `build:h5` → `uni build --outDir ./dist`，H5 产物**平铺在根目录 `dist/`**（index.html + assets + static），CI/CD 直接部署该目录
- `build:mp-weixin` → `dist-mp-weixin/`（独立目录，避免被 H5 构建清空）

**验证：** 完整模拟 CI（清空 → install-dependencies → test → build），三步均 exit 0，`dist/index.html` 存在。

**推送结果：** `8e3b830..2e42478  dev -> dev` ✅

注：README 原文为 UTF-8，编辑后已校验无乱码（0 个替换字符）。

<!-- MEMORY_FIELDS
{
  "event_name": "防汛C端补齐CI/CD命令",
  "goal": "补齐CI/CD构建命令",
  "summary": "为苏住房防汛C端参照同类前端项目（苏住房C、考评子系统H5）约定，在 package.json 新增 install-dependencies（bun install --frozen-lockfile）、将 build/build:h5 改为 uni build --outDir ./dist 平铺输出到根目录 dist/、build:mp-weixin 输出到独立 dist-mp-weixin/；同步更新 README 与 .gitignore，于 2026-11-03 验证通过后提交并推送到 dev 分支（commit 2e42478，8e3b830..2e42478）。",
  "ranges": "0,89-102",
  "source_extraction_id": "f2993719df7c432e969560383291f703",
  "version": 1,
  "memory_type": "events"
}
-->