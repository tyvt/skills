# ZenTao Bug 6955 C端首页去 MOCK 接真实数据
禅道缺陷 6955：C 端首页接口有数据但未显示；根因是 `loadRegions()` 从未调用、G 端统计不请求（`activeDeptId` 为空跳过统计请求）；2026-11-25 已修好并完成 `build:h5`，8161 首页关键数据已出数；hop3 完成报事报修对齐 G 端「马上办」（三页签/趋势图/真实数字）并提交推送 `782a75a`，禅道回写待 hop4。

## 工单与根因
- 接口有返回数据但页面未显示；用户反馈此前正常，移除 mock 数据后出现问题（http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6955）。
- 根因：`loadRegions` 已定义但从未调用/未挂载、区域未初始化，G 端 `activeDeptId` 为空导致统计请求被挡。
- 8095 说法来自旧 nginx/记忆，不对；验证地址以部署面板为准：dev `http://localhost:8161`、test `8162`（此前因 8095 不可达改用代码证据复现）。
- 计划已写好并提交 `plan_review`，通过后用户确认实施、更新计划状态，随后开始修改 `home/index.vue`。

## 改动与验证
- 改动（`src/pages/home/index.vue`）：`loadRegions` 加 inflight、默认全市后调 `loadStats`；`onMounted` / `onShow` 挂载。
- 已完成 `build:h5`；8161 首页关键数据已出数（如 10842）。
- 全页截图 C:/Users/Administrator/AppData/Local/Temp/bug6955-home-20261125-162830.png 已落盘并 present 给用户。
- 登录后核对：8161/8162 首页需登录；验证码 UUID 不同步致停留在登录页，尝试 API 直连登录绕过，同步浏览器内验证码后完成登录并核对统计展示。

## 交接与后续
- 2026-11-25 hop1 成本交接：交接文档 D:/plan/苏住房防汛C端/HANDOFF-CHAIN-zentao-bug-6955-hop1-20261125-1631.md，约 16:32 开新会话接续。
- 用户确认数据疑点通过：C 端当月口径接口真实返回 0，历史累计有真实数据 3 条（3/0/3），G 端为不同接口/口径，两端口径不同。
- hop3 完成报事报修对齐 G 端「马上办」：三页签/趋势图/真实数字在 8161 实机验证通过并经用户确认；改动 `src/pages/home/index.vue`（页签/标签口径 + SVG 趋势图 + 样式，+100/-27 行），build exit 0、产物 `index-_8g0CgpU.js`、8161 http=200，两张验证图入会话、验证门通过。
- 提交前删除未跟踪过程产物 `x!`（空文件，键盘误产生）与 `_review.json`（hook 验证状态文件），工作区只剩 `src/pages/home/index.vue` 改动；已提交 `782a75a` 并推送 origin/dev 成功。
- 禅道 6955 回写仍未完成（交接 hop4）：bug 当前 active（被 lichandan 15:57 激活，因首页数据没值），上一轮 resolved 可作模板；需 status→resolved + comment 附两张验证图（须先上传图片拿 fileID，上传方式未找到）。hop3 P0 硬交接文档 `HANDOFF-CHAIN-zentao-bug-6955-hop3-20261125-1713.md`，下一跳排程 `schedule-b3ff5a91-b477-4fa1-accd-78ce87c44623`（17:13:44 投递，new_once）。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6955",
  "source_extraction_id": "101d870c28284dc986e9d6b7d109d016",
  "version": 4,
  "memory_type": "entities"
}
-->