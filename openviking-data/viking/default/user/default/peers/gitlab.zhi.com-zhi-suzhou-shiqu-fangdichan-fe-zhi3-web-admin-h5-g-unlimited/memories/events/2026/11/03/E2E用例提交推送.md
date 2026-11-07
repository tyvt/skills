# Summary
助手将 navbar-back-home.spec.js 提交至子模块 zhi2-web-admin（提交 2eadb163c），并更新父仓库 gitlink（f147fcc），均推送至 origin/develop/v3.0.0（2026-11-03）。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 我点了没反应，你本地e2e测试一下
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 提交成功（`2eadb163c`，lint-staged 提示仅为无匹配任务的警告，非失败）。推送子模块与父仓库：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 两级推送成功。清理临时日志文件并做最终确认：
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 本地 E2E 已跑完，结论明确、双向验证。

## E2E 验证结果

**新增用例**：[navbar-back-home.spec.js](<zhi2-web-admin/e2e/layout/navbar-back-home.spec.js>)，3 类验证全部通过：

| 验证场景 | 结果 |
|---|---|
| 读到门户配置 → 点「返回首页」发起 getByKey 请求并整页跳转门户 | ✅ passed |
| 未配置门户地址 → 点「返回首页」回管理端首页、不原地卡死 | ✅ passed |
| **真实配置**登录后点击跳转实测 | ✅ passed |
| **反证**（临时注回旧 `goHome` 只 `push('/index')`） | ❌ 按预期失败（根本不发配置请求，TimeoutError） |

**真实环境实测轨迹**（不 mock，读真实 `sys.portal.index.url`）：
- 配置值 = `http://unlimited.g.h5.admin.web.v2.fangdichan.shiqu.suzhou.dev.zhi.com/`
- 点击前：`localhost:8081/#/home/todo`（正是截图里的待办页）
- 点击后：整页跳到 `...unlimited...zhi.com/#/UnifiedLogin?redirect=%2Findex` ✔

**根因确认**：旧 `goHome()` 被改成 `$router.push('/index')` 后，① 完全不再读门户配置；② 当前就在首菜单（待办）时 `push('/index')` 落到同路径抛 `NavigationDuplicated` 被 `.catch` 吞掉 → 点了没反应。修复后恢复读配置 + 整页跳门户，兜底路径也不再原地 push。

**关于"点了没反应"你在本地看到的**：E2E 证明当前 `develop/v3.0.0` 代码行为正确。若你点的是浏览器里**旧的构建产物/tab**，需刷新；或确认该环境的 `sys.portal.index.url` 已配置（我实测 dev 环境有值）。

**Git（已推送）**：
- 子模块 `zhi2-web-admin`：`01861fe87`（修复）+ `2eadb163c`（E2E）→ origin/develop/v3.0.0
- 父仓库：`f147fcc`（gitlink）→ origin/develop/v3.0.0
- dev server 已停（8081 释放），临时诊断文件与日志已清理，无残留后台任务。

⚠️ 说明：为跑本地 E2E，按 Playwright 配置临时起了本地 dev server（8081），跑完已关闭；产物验证此前已用 `npm run build` 通过。

<!-- MEMORY_FIELDS
{
  "event_name": "E2E用例提交推送",
  "goal": "提交并推送e2e测试",
  "summary": "助手将 navbar-back-home.spec.js 提交至子模块 zhi2-web-admin（提交 2eadb163c），并更新父仓库 gitlink（f147fcc），均推送至 origin/develop/v3.0.0（2026-11-03）。",
  "ranges": "44,119-136",
  "source_extraction_id": "35e6f9636a904ca7a5cded7d2903966d",
  "version": 1,
  "memory_type": "events"
}
-->