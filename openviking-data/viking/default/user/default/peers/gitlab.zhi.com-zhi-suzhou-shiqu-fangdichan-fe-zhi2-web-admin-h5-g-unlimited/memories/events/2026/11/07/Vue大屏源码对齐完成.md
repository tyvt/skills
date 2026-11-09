# Summary
2026-11-07 zhi2-web-admin/src/views/property/marketMonitor/ 整套 Vue2 大屏按 localhost:3000 最新版 React 源码完整移植完成；npm run build 通过，部署至 nginx 8092（http://127.0.0.1:8092/index.html#/market-monitor）；E2E 相似度门禁不低于 98%，5/5 全过（确定性 100%、联网 100%、离线 100%、交互 100%、1366×768 为 99.999%）；本轮未触碰登录代码或 admin 密码，admin 账号 STATUS=0 正常。
# 2026-11-07 (Saturday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 需要对齐的不是单独HTML，而是vue代码，确认一下
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 需要对齐的不是单独HTML，而是vue代码，确认一下
...
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 需要对其vue代码，如果没对齐就做一下
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 确认收到 —— 之前交付的是单文件 HTML，范围错了。**这次对齐的是 Vue 源码本身**，并且已做完、构建部署、E2E 全部通过。

## 做了什么

`zhi2-web-admin/src/views/property/marketMonitor/` 整套 Vue2 大屏按 localhost:3000 最新版 React 源码完整移植（旧版与参考站仅 **83.29%** 相似）：

- [index.vue](<zhi2-web-admin/src/views/property/marketMonitor/index.vue>)：根布局重写为 `ScreenAdapter` contain 等比缩放，新增 DistrictBanner，第二行改成三面板（累计可售 / **未售房源（新增）** / 购房人画像总览）
- 9 个面板组件整篇重写，新增 [DistrictBanner.vue](<zhi2-web-admin/src/views/property/marketMonitor/components/DistrictBanner.vue>)、[UnsoldPanel.vue](<zhi2-web-admin/src/views/property/marketMonitor/components/UnsoldPanel.vue>)，删除死组件 DistrictPie.vue
- [dashboard.css](<zhi2-web-admin/src/views/property/marketMonitor/assets/dashboard.css>) 由最新版 Tailwind v4 构建 CSS 生成并作用域到 `.mm-dashboard`；[data.js](<zhi2-web-admin/src/views/property/marketMonitor/assets/data.js>) 由 `marketData.ts` 直出；icons.js 由 lucide-react 补齐
- [ChartBox.vue](<zhi2-web-admin/src/views/property/marketMonitor/components/ChartBox.vue>) 从 echarts 5.4.3 + SVG 换成 **echarts 6.1.0 + canvas**（与参考站 EChartBox 一致）；页头加入同款 Google Fonts
- 两个关键坑：门户全局 CSS 在 1280–1440px 把 `html` 字号压到 14px（rem 间距整体缩小），在 `created()` 里锁定 16px 才让 1366×768 也对齐

`npm run build` 通过，产物已由 nginx 8092 站点提供：`http://127.0.0.1:8092/index.html#/market-monitor`。离线单文件 [market-monitor.standalone.html](<market-monitor.standalone.html>) 也改成由**对齐后的 Vue 源码**经 `standalone-build` 管线派生，不再是 React 构建产物。

## E2E 相似度（门禁 ≥98%，5/5 全过）

| 场景 | 相似度 |
| --- | --- |
| 确定性对比（字体桩化，Vue 页面 vs 参考站） | **100.000%** |
| 真实联网（加载 Google Fonts） | **100.000%** |
| 离线单文件（file:// 直开） | **100.000%** |
| 交互对齐（监测范围 = 姑苏区） | **100.000%** |
| 多分辨率 1366×768（ScreenAdapter 缩放） | **99.999%** |

测试脚本在 [market-monitor-similarity.cjs](<tests/e2e/market-monitor-similarity.cjs>)，报告与差异图在 `test-results/mm-similarity/`；复现步骤见 [market-monitor-alignment.md](<docs/market-monitor-alignment.md>)。

## Git / worktree

子模块 worktree `zhi2-web-admin-wt-mmport`、主仓 worktree `门户-wt-mme2e` / `门户-wt-doc` 均已合并并删除，分支已清理；其它任务的 `zhi2-web-admin-wt-payfund` 未触碰。本地提交（**均未推送**）：主仓 `b1cf316 → f5a2eab`，子模块 `50ef0e0c4`（父仓 gitlink 已更新为 `91a7bdf`）。提交/推送的问题卡片三次超时无回答，所以没有推送远程；需要推送时说一声即可。无残留后台任务。

## 关于 admin 密码

这轮改动没有碰任何登录代码或密码。查库确认 `admin` 账号状态正常（STATUS=0）、密码最后更新时间 2026-09-24 未变、最后登录 2026-11-06 18:02:48。密码"不对"更可能是口令记错、连续试错触发 dev 账号 30 分钟临时锁定，或当前 8092 代理的后端环境与凭据所属环境不一致。如方便把登录报错原文发我，我再定位具体是哪一种。

<!-- MEMORY_FIELDS
{
  "event_name": "Vue大屏源码对齐完成",
  "goal": "完成Vue源码对齐",
  "summary": "2026-11-07 zhi2-web-admin/src/views/property/marketMonitor/ 整套 Vue2 大屏按 localhost:3000 最新版 React 源码完整移植完成；npm run build 通过，部署至 nginx 8092（http://127.0.0.1:8092/index.html#/market-monitor）；E2E 相似度门禁不低于 98%，5/5 全过（确定性 100%、联网 100%、离线 100%、交互 100%、1366×768 为 99.999%）；本轮未触碰登录代码或 admin 密码，admin 账号 STATUS=0 正常。",
  "ranges": "0-1,6,268-284",
  "source_extraction_id": "0b58a661573d498cac397b128d5ffe38",
  "version": 1,
  "memory_type": "events"
}
-->