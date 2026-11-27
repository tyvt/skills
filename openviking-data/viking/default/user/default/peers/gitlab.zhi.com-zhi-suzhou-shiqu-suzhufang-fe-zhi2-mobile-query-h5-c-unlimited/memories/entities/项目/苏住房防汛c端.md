# 苏住房防汛C端
苏住房防汛C端是苏州住房防汛相关的移动端C端项目，采用 worktree 隔离开发。

## 项目路径与部署
- 主工作区路径 `D:\repository\苏住房防汛C端`，严禁直接修改；可写 worktree 路径 `D:\repository\苏住房防汛C端-wt-login-align`，分支 `fix/login-design-align`。
- 本地部署站 `http://127.0.0.1:8095/`（nginx 指向 worktree dist）；2026-11-27 实机验证部署地址为 `http://localhost:8150/`，读取新构建 dist。
- 部署面板：防汛C端 test 环境端口 8162，dev 环境端口 8161；构建命令 `bun run build`。
- 权威设计稿 `artifacts\design-mine-mine.webp`（820×1800，即 410×900@2x），要求 100% 还原颜色、圆角、间距、字号。
- H5 登录页含「用户登录」tab，使用用户名 + 密码 + 图形算术验证码登录；短信登录需手机号 + 身份证后四位 + 短信验证码；2026-11-25 确认 test 环境账号密码与苏住房G端相同，使用 `{{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}` 对应账号登录；2026-11-27 自动化登录需在验证码字段按 Enter 触发 `@confirm="submit"`。

## 首页与构建验证
- 首页数据统一在 `src/utils/portalData.ts`（约 121 行）取数，由 `src/pages/home/index.vue`（约 26 行）加载。
- 2026-11-14 首页五类接口改为各自失败回退空态，首页加载与学习 tab 切换增加异常捕获，接口路径与参数不变。
- 依赖环境为 Bun 1.4.4 + 冻结锁文件 `bun.lock`；缺 `vue-tsc` / `uni` 入口时需先按锁文件安装依赖才能类型检查与构建。
- 2026-11-14 验证结果：H5 构建通过（仅 Sass 弃用警告）；类型检查尚存 26 条既存错误，首页相关文件错误已清零。
- 任务日志目录 `.task-state/`（如 typecheck-after-fix.log、deps-install.log）；2026-11-27 基线构建与改后构建均通过（EXIT=0），静态复核低于 14px 字号残留为 0。

## 字号下限调整
- 2026-11-27 按用户要求执行全项目字号下限 14px：只将 <14px 提升到 14px，≥14px 保持不变。
- 2026-11-27 共改 25 个文件 223 处：206 CSS px、9 ECharts `fontSize: 12`、2 rpx、6 SVG `setAttribute`。
- 2026-11-27 实机首页（390×844）验证：`.notice-text`、`.key-title`、`.key-row-label`、`.stat-label`、`.todo-sub` 计算样式字号均为 14px。
- 2026-11-27 实机验证中 `.key-row-value`（18px）与 `.card-title`（15px）等 ≥14px 字号保持原样。
- 验证截图路径 `C:\Users\Administrator\AppData\Local\Temp\font14-home-20261127-172859.png`（用户确认前不删除）。

## 表单、缺陷与关系
- 表单页 `src/pages/project-check/form/index.vue`，支持 `local=1` 本地草稿模式，草稿由「发起检查」流程写入 localStorage 后才能读取。
- 统一上传提示文案为「请上传大小不超过 5MB 格式为 png/jpg/jpeg 的文件」，既有用于 `rectify/index.vue:238`、`Ref8443Inspection.vue:234`；2026-11-25 禅道缺陷 6957 修正该文件第 456 行提示文案（仅 1 行），改前改后构建均通过（exit 0）。
- Lead 负责分配任务与构建协调；data-builder 同 worktree 改 data 页并共享 dist，需构建前报备。
- AI助手实现了「我的」页（src/pages/mine/index.vue）。
- 2026-11-27 P0 交接文档 `D:\plan\苏住房防汛C端\HANDOFF-CHAIN-防汛C端全项目字号下限14px-hop1-20261127-1730.md`，chain_id=防汛C端全项目字号下限14px，hop=1/10；助手记录用户已确认验证通过 + 提交推送授权，但未完成 `git commit` + `push origin dev`、过程产物清理与后台任务收尾，交由接续会话执行。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "92e3f1b16a704d528569e94aa5a9b466",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 5,
  "memory_type": "entities"
}
-->