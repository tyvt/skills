# 禅道 Bug 6959
禅道缺陷 6959：2026-11-25 修复并验证 zhi2-mobile-query-h5-c 管理 APP 首页待办卡片的 4 处问题。

## 问题与目标
- Page（UI/布局），2026-11-25 10:09 提单；涉及待办/已办/我发起 3 个 tab；历史图角标 12、预期 14，含「共12项待办」「共6项待办需处理」。
- fileID=24285 为本仓 H5 结果图，24284 为 G 端 admin web 期望参考（不同产品），均在 D:\禅道附件\bug\6959。
- 目标：①计数取真实 todoNum；②图标/标题同行且内容顶格对齐新闻公告；③去重复计数；④去标题下提示文案。
- 文档 maxHops=10 与 2026-11-23 P0「不设最大跳数、禁止 maxHops」冲突；两口径均不终止，按文档继续。
- localhost:8161 dev 首页 HTTP 200 免登录；无 token 时待办 0（接口回退）；/api 代理 200 JSON、验证码 base64 JPEG；无 login6959*.json token 缓存。

## 根因与环境
- src/pages/home/index.vue:277-290；旧计数取 getTodoTaskList.taskPage.total=12，权威值 14 来自 G 端 taskCount；真实契约 todoNum（实测 4940→4912 随时间变化）。
- fac366a（10:07，早于提单）已把硬编码「12」「共6项待办需处理」动态化并移除「需处理」；历史线上图来自旧构建。
- 用户确认新增 taskCount API、给测试账号+URL并要求面板登记；面板记账号、外部前端 URL、secret_ref（凭据 deploy_env-huishan-g-dev；target_key 不含中文）。
- zt_bug.steps 需 SUBSTRING 分片（单元格约 200 字截断）；DBX 连「新禅道」，参数 sql（非 query）。
- 独立 Chrome/CDP 端口 9229 可用；doctor 报无 binary 但进程在且 D:\ungoogled-chromium\App\chrome.exe 存在，daemon pid 14348 被杀后 state 陈旧、共享 profile 占用；agent-browser 非 batch 会 relaunch、refs 不跨命令、uni-input 使 CSS 定位不稳；须 batch 单进程、登录按钮 @e4（--name 登录误中 tab）、验证码刷新后裁剪识别、CLI 输出后台重定向读文件。

## 验证与修复
- 已完成计划审核+sha 回填、改前 build（nohup npm 因 MSYS 失败改 Windows npm 后台）、4 处改动、改后 build+test 全绿、部署面板登记。
- UI 验证码登录反复失败（CLI 每次挂 ~120s 致过期；算术验证码 3+1=4、6+5=11 仍被拒）；改用 API 登录（AES 加密密码 + vision 解验证码、JWT 270 字符）成功，todoNum=4912。
- token 存 localStorage['flood-token-v1']，支持 ?token=xxx 注入；截图 C:/Users/Administrator/AppData/Local/Temp/zentao-6959/verify-home-20261125-131148.png 显示 4912 及①③④生效，已 present 给用户。
- DOM 实证：.todo-head（图标+标题+徽标同行）存在，.todo-main/.todo-sub/.todo-more/.todo-title-row 已删。
- 用户反馈「待办内容不见了」：②应为内容左对齐、④才是去提示文案，删掉整个 todoText 内容行属过度修复；原内容「物业服务合同备案：东清财富广场」数据仍在 portalData.ts:180，仅模板不显示；用户选择恢复为单行摘要。

## 回写与交接
- 后续已完成禅道 6959 带图回写（resolved/fixed、附图 fileID 24348、zt_action 99536）、commit d2effe5 推送 origin/dev、过程产物清零并终止链路。
- P0 验证门曾要求 agent-browser 打开改动首页→截图到 $env:TEMP\zentao-6959\→read_image 自检→同一正文 present + 内嵌正斜杠绝对路径→ask_user_question 确认；确认前禁止提交/回写，后续已通过并执行提交回写。
- chain_id=bug6959-home-todo，hop3→hop4，计划评审 82/100 通过并触发 P0 硬交接；hop2 token 达 P0（1.01M）写 9 段交接排 new_once；hop2/hop3 均 ~1.00M 触顶，第 4 节未完成项非空、链路继续。
- hop3 交接文档 D:\plan\苏住房防汛C端\HANDOFF-CHAIN-bug6959-home-todo-hop4-20261125-132328.md（9 节，第 4 节 5 项未完成）；下一跳 schedule-29bd0841…，new_once，DTSTART 13:24:35+08:00。
- hop4 原计划为恢复 .todo-sub 单行内容行（数据 portalData.ts:180）→重跑 build/test→验证门出图、用户确认→提交 + 禅道回写附图 + 产物清零，已完成。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6959",
  "source_extraction_id": "7b739592e1444a92a7425726c7a25ff0",
  "version": 5,
  "memory_type": "entities"
}
-->