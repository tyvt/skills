# 禅道任务 2953
禅道任务 2953 / story 1548「工作台新增入口及跳转」于 2026-11-26 进入实施阶段；两仓代码改动已完成，因等效成本触顶已交接排程继续。

## 需求
- 工作台「常用功能」新增 5 个入口（巡检记录/巡查填报/隐患上报/物业自查/汛中巡检），新增「电动车巡检」「项目检查」「防台防汛」三个分组；常用功能快捷入口与分组入口须指向同一 H5 链接。
- 物业自查发起检查时，物业管理区域默认取页面顶部选中区域。
- 四个检查（物业自查/街镇/区县/市级）去掉「更多筛选」首项「行政区划」。
- 街镇/区县/市级检查去掉「发起检查」按钮。

## 仓库定位与决策
- `物业手持B端` 为 uni-app 项目，只有工作台页 `src/pages/workbench/index.vue`，无「项目检查」页面；git 仅有未跟踪 `bun.lock`。
- 需求 2–4 的 `project-check` 页面在兄弟仓 `苏住房防汛C端` / `苏住房G`。
- 需求文档未给出新入口 H5 跳转 URL，仓库亦无对应链接配置；用户确认两仓都改并复用兄弟仓路由。

## 进展
- 计划审核 84/100，3 个灰区经用户确认后锁定，approved_sha256=02e249cc8b…；B 端已完成两处改动：工作台 sections 扩为 6 组（常用功能补 5 入口 + 新增 3 分组），`pages.json` 注册 webview 路由。
- 等效成本 1.01M 越过 1.00M 档位触发 P0 硬交接，已写 9 节交接文档 `D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop1-20261126-160042.md`；hop1 已排定（id `schedule-2c7e02eb…`，16:01:28 投递，target=new_once）。2026-11-26 hop2 读交接文档（第 5 节 chain_id=禅道2953工作台新增入口及跳转、hop=2；第 4 节未完成项非空→继续），第 8 节已完成项禁止重做：两仓代码改动 + `npm run build` EXIT=0、权威 spec 复核、hop1 取证。
- 前端验证门被 B端 `localhost:8180` 凭据阻塞（需账号+密码+图形验证码；面板 `login_user=null`、隐私库无该站账号），按 clarify-first 向用户索取并收到凭据。文档第 8 节 H5_BASE=`...h5-zhishu.shimin...zhi.com`（取自兄弟仓 vite.config.ts:6）与用户测试网关 `...h5.query....zhishusz.com` 域名不同；按「文档与上下文冲突以文档为准」未改代码 H5_BASE，网关仅作本地验证代理目标登记。凭据已登记部署面板并核验生效：密码走隐私库（明文不入库）、含物业与管理员两角色及 H5 测试网关；修正 `login_user=601117997`（物业角色）的 `secret_ref` 被末条 admin 命令覆盖为 admin 引用的错配，已改回配对。会话等效成本 158k>150k 触顶，按交接链第 5 节（未完成项非空）交接；落盘交接文档并排程 hop=4（16:19:09 触发，target=new 干净会话，prompt 仅四项）。
- 2026-11-26 hop7（08:37–08:44，chain_id=禅道2953工作台新增入口及跳转）：文档第 5 节写 hop=6（hop6 交接）、schedule 判 hop=7、触顶交 hop=8；按 hop=7 接续且第 4 节非空继续；勿重做两仓代码 + build(EXIT=0)、凭据登记、登录页打标、验证码提取命令修正。浏览器排查：`timeout` 在 MSYS 返回 126 故不用，命令挂起转后台但输出已返回；切勿 kill 挂起 job（上次 kill 导致浏览器 CLI 桥接断开）；重开后三 input 无 DOM id（hop6 打标丢失）、顺序稳定为账号/密码/验证码，已重新打标；CLI 支持 `network requests` / `network console`；验证码图为有效 JPEG(2892B)、算式 `8-2=?`。登录卡点根因：抓包见 `POST /api/v2.0/security/auth/userLogin` 返回 400、toast「用户名或密码错误」×2、验证码已过（先前一度只见 `GET /api/v2.0/code` 无登录 POST）；最可能根因为 uni-app 下 DOM value 改了但 Vue data 未同步、接口收到空/旧值，下一跳用 HAR 抓请求体确认。
- hop7 等效成本 157k 触顶止损交接：落盘 `D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop7-20261126-1643.md`；排程 hop8 `schedule-19d21b39-f730-40a4-9409-4da34101c82c`（session `session-a5106a55…`，16:44:08，new_once）；本跳不 kill 浏览器 job 以保留会话桥接给下一跳。2026-11-26 hop13（chain_id=禅道2953工作台新增入口及跳转、不设最大跳数、禁标「最后一跳」，完成只看第 4 节清空）：网关 conf 已修正并 reload、失败根因已排除；刷新页面重 patch XHR `__netlog`（刷新后失效），vision 两步识别验证码（`3+5=?`→8），账号 `601117997` / 密码隐私库取值，单引号填表读回校验正确；MSYS `/tmp` 与 Windows python 不互通，改用 Windows 临时路径；用 eval 点击单个 `uni-button` 登录成功（非 click @e5），URL→`/#/pages/home/index`，user/permission/msg 接口 200，token 落 localStorage（42259 字符）。当前区域=嘉樾时代花园（projectId=667585159348728），进入工作台页 `/#/pages/workbench/index`，6 组菜单已加载，核对 h5RouteMap/openH5/handleMenu 锚点（`src/pages/workbench/index.vue:197-256`）。等效成本 152k 触顶交接 hop14；落盘 9 节交接文档 `D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop13-20261126-1706.md`；排程 hop14（17:06:46 投递、active、schedule_list 第一条，P0 置顶已确认）。未重跑 build/凭据/conf/验证码识别。

## 待办（由排程的下一跳承接，hop14）
- agent-browser 实机验证 6 组入口跳转 + 新入口跳转 + req2/start 带出选中区域、req3/更多筛选隐藏行政区划、req4/checkType 2/3/4 隐藏发起检查。
- 截图自检 + present + 内嵌（`screenshot --full` → `$env:TEMP/zentao-2953/`），经 ask_user_question 请用户确认；确认后提交推送两仓 + 回写禅道 2953（comment 附图）。
- 清理临时产物与 job；若再次触顶按交接链规则交接，chain_id 不变、禁带 maxHops。


<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2953",
  "source_extraction_id": "a2b4d7adda7641e58acfada91fed7d03",
  "version": 5,
  "memory_type": "entities"
}
-->