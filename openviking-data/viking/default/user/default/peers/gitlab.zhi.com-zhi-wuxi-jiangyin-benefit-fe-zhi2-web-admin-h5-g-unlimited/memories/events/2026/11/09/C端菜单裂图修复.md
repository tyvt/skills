# Summary
江阴H5 C端（共有资金菜单页 #/pages/menus）5个菜单图标裂图问题（禅道任务2330）已修复并关闭。根因为生产nginx响应头 Content-Security-Policy: default-src 'self' 无 img-src，Vite默认 assetsInlineLimit=4096 将约1KB小图内联为 data:image/png;base64 被CSP拦截。修复将 menus.vue 5图标改为 /static/images/home/menu_icon*.png 真实文件路径并去掉import，图标从 src/pages/static/ git rename 到 src/static/images/home/，vite.config.ts 设 build.assetsInlineLimit:0 全局禁止内联；构建验证菜单chunk从8475B降至1214B且 data:URL出现0次。2026-11-09 在 worktree 江阴H5-wt-2330/分支 fix/2330-menu-image-display 提交 db3b953，fast-forward 合并 main 并推送 origin/main。禅道回写 zt_task 2330 status=done、finishedBy=tiany、finishedDate=2026-11-09 09:28:30、assignedTo 回 zhouzhijing，新增 zt_action action=finished。遗留：生产站点 221.228.70.192:8448 需用户手动同步 dist 才生效；运行时生成的 data: 图片仍被CSP拦截，建议运维补 img-src 'self' data:。
# 2026-11-09 (Monday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=task&f=view&id=2330
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-web-admin-h5-g-unlimited]**: ## 结论：禅道任务 2330 已修复、验证、提交推送并回写禅道

### 根因（先看截图，不是方法名猜的）
任务 2330 的截图（附件 `fileID=21903`）是「共有资金」菜单页 `221.228.70.192:8448/#/pages/menus`，5 个菜单图标全部裂图。对应代码在**同级仓库 `D:\repository\江阴H5`**（当前工作区 `江阴公共收益` 只是 B 端 admin，没有这个页面）。

- 生产 nginx 响应头：`Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';` —— **没有 `img-src`**，图片回退到 `default-src 'self'`，`data:` 不在允许范围。
- [menus.vue](<../江阴H5/src/pages/menus.vue>) 用 `import` 引入 5 个 28×28、约 1KB 的 PNG；Vite 默认 `assetsInlineLimit=4096` 把它们全部内联成 `data:image/png;base64,...`，被 CSP 直接拒绝加载。线上 `pages-menus.CFC00KpU.js` 里确实就是 5 段 base64（已下载核对），而较大的图片以真实文件输出所以正常。
- 旁证：兄弟项目 `惠山二期H5/惠山V1小程序` 的同款 menus.vue 用的是 `/static/images/home/*.png` 真实文件，没有这个问题。

### 改动（均在独立 worktree 内完成）
| 文件 | 改动 |
| --- | --- |
| [menus.vue](<../江阴H5/src/pages/menus.vue>) | 5 个图标改为 `/static/images/home/menu_icon*.png` 绝对路径，去掉 `import`，与惠山 C 端一致 |
| `src/static/images/home/` | 5 个图标从 `src/pages/static/` 迁入（git rename，100% 相似） |
| [vite.config.ts](<../江阴H5/vite.config.ts>) | `build.assetsInlineLimit: 0`，全局禁止内联成 `data:` URL，顺带修好首页等其它小图标 |

### 验证证据
- `npm run build` 成功，构建时间 `2026-11-09 09:02:07`（[dist/index.html](<../江阴H5/dist/index.html>)）。
- 菜单 chunk：`8475B → 1214B`，`data:image` 出现 **0 次**，改为引用 5 个同源 `/static/...` 路径。
- 本地 nginx 站点 `江阴智慧物业H5`（8102，root 指向 `江阴H5/dist`）已同步新 dist 并实测：chunk 200、5 个图标全部 200 且字节数与原文件一致。
- **Git**：worktree `江阴H5-wt-2330` / 分支 `fix/2330-menu-image-display` 提交 `db3b953` → fast-forward 合并回 `main` → 推送 `origin/main`，`ls-remote` 确认远端 `db3b953…refs/heads/main`；worktree 与分支已删除，`git worktree list` 只剩 main。主工作区他人未提交的 `src/pages.json` 原样保留，未触碰。
- **禅道**：DBX 事务化回写并二次复核：`zt_task 2330 status=done`、`finishedBy=tiany`、`finishedDate=2026-11-09 09:28:30`、`assignedTo` 回到 `zhouzhijing`，新增 `zt_action action=finished`（备注 1077 字，含根因/修复/验证/提交号）。

### 两点需要你留意
1. **生产站点尚未更新**：`221.228.70.192:8448` 不是本机 nginx 管理（本机站点只监听 8102），需要把 `D:\repository\江阴H5\dist` 发布到那台服务器，线上才会生效。
2. **CSP 遗留项**：运行时生成的 `data:` 图片（登录图形验证码 `data:image/png;base64,${data}`、z-paging 空态图、echarts canvas 导出、uni loading 转圈）仍会被该 CSP 拦截，前端无法消除。建议运维在生产 nginx 补 `img-src 'self' data:;`。这属于服务端配置，本轮未改动。

<!-- MEMORY_FIELDS
{
  "event_name": "C端菜单裂图修复",
  "goal": "修复C端菜单裂图",
  "summary": "江阴H5 C端（共有资金菜单页 #/pages/menus）5个菜单图标裂图问题（禅道任务2330）已修复并关闭。根因为生产nginx响应头 Content-Security-Policy: default-src 'self' 无 img-src，Vite默认 assetsInlineLimit=4096 将约1KB小图内联为 data:image/png;base64 被CSP拦截。修复将 menus.vue 5图标改为 /static/images/home/menu_icon*.png 真实文件路径并去掉import，图标从 src/pages/static/ git rename 到 src/static/images/home/，vite.config.ts 设 build.assetsInlineLimit:0 全局禁止内联；构建验证菜单chunk从8475B降至1214B且 data:URL出现0次。2026-11-09 在 worktree 江阴H5-wt-2330/分支 fix/2330-menu-image-display 提交 db3b953，fast-forward 合并 main 并推送 origin/main。禅道回写 zt_task 2330 status=done、finishedBy=tiany、finishedDate=2026-11-09 09:28:30、assignedTo 回 zhouzhijing，新增 zt_action action=finished。遗留：生产站点 221.228.70.192:8448 需用户手动同步 dist 才生效；运行时生成的 data: 图片仍被CSP拦截，建议运维补 img-src 'self' data:。",
  "ranges": "0,171-185",
  "source_extraction_id": "a9cd2db795134d0cb8a0451ae582c166",
  "version": 1,
  "memory_type": "events"
}
-->