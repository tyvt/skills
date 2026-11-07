# Summary
2026-11-04 Agent 用 Playwright 真实登录（解图形验证码）进入 /#/pages/inspection/index?kind=mid，确认底部内联横幅消失（role=alert 计数 0），制造校验错误弹出居中 toast「请选择物业管理区域」。
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 你是 Team 的「错误提示改 toast」专职成员。先 team_task_list 拿 task-6（subject 含“全局移除内联错误横幅”），team_task_get 读完整描述，claim（expected_revision 取最新）后按描述执行，完成 typecheck 后 complete。

环境事实：
- worktree（唯一可写区）：D:\repository\苏住房防汛C端-wt-login-align ，分支 fix/login-design-align。严禁动主工作区。
- 已有工具 src/utils/notify.ts 的 `toastError(msg, fallback)`，用它做 toast。
- 构建：`bun uni build -m test --outDir ./dist`（test/remote 模式，连后端）。纯 `bun run build` 是 demo 无后端，不要用它做本任务验证。
- 本地站 http://127.0.0.1:8095/ （nginx 已指向本 worktree dist）。Chromium：C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe（运行 playwright 设 $env:PLAYWRIGHT_CHROMIUM_EXECUTABLE）。
- Playwright 运行用 `node node_modules\.bun\@playwright+test@1.64.1\node_modules\@playwright\test\cli.js test` 或独立 mjs `import { chromium } from '@playwright/test'`。截图拦截 **/font/** 与 **/*.woff2* 避免卡死，deviceScaleFactor:2。
- 源码含 GBK mojibake 中文，用 read 工具读、edit/write 改。
- 测试登录：主登录页 / ，用户名输入 zsbase、密码 Zs@2026Aa!，点 .login-agreement 勾选，点 .login-submit 登录成功进 /pages/systems/index。

构建协调：只有你一个在本轮 build（其他 teammate 空闲）。build 前 send_message 给 Lead 报备一句即可。

核心要求：把各页面**内联红色错误横幅（form-alert role=alert / login-error）全局去掉**，所有 `error.value = <msg>`（接口错误 + 表单校验错误）改为 `toastError(<msg>)`；保留 loading 与 success 提示。具体逐文件规则见 task-6 描述，严格遵守（尤其 rectify、form 两页的条件横幅处理）。

务必：改完 `bun run typecheck` 必须 =0；再 build 部署；Playwright 实测——进汛中巡检表单页 /#/pages/inspection/index?kind=mid（需先登录），确认底部「服务未找到」内联横幅已消失；制造接口错误验证出现 toast（截图）。给 Lead：改动文件清单 + typecheck 结果 + 截图（横幅消失、toast 出现）。若某页 error ref 依赖复杂，优先保证 typecheck 通过。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Login succeeded and landed on /pages/systems/index. On the inspection mid page, ROLE-ALERT-COUNT = 0 — no inline error banner. Let me view the screenshots to confirm the page loaded correctly and the banner is gone.
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Toast appeared with text "请选择物业管理区域" — confirming the validation error now shows as a toast instead of an inline banner. Let me view the toast screenshot.

<!-- MEMORY_FIELDS
{
  "event_name": "巡检页改toast验证",
  "goal": "验证重构效果",
  "summary": "2026-11-04 Agent 用 Playwright 真实登录（解图形验证码）进入 /#/pages/inspection/index?kind=mid，确认底部内联横幅消失（role=alert 计数 0），制造校验错误弹出居中 toast「请选择物业管理区域」。",
  "ranges": "0-10,188,202",
  "source_extraction_id": "7e643458c5b04264a265ce23416de23c",
  "version": 1,
  "memory_type": "events"
}
-->