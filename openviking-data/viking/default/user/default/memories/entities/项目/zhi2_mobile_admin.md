# zhi2-mobile-admin-h5-c-unlimited
uni-app Vue3 H5 项目（无锡市民/苏服办 C 端入口），子模块仓库，父仓 main-sfb 持有 gitlink。

## 代码结构
- src/utils/h5Context.js：新增 logSfbJumpContext(source)，记录入口 URL、8 个关键参数存在性、缺失字段、referrer 与容器类型（支付宝/hanweb）
- src/App.vue：onLaunch/onShow 中接入日志（H5 条件编译块内），不加定时器、不轮询
- src/utils/portal.js 的 mergeLingXiHouse（约第 203 行）：把灵犀第三方选屋结果合并进房屋列表，首页标题读取 houseList[0].complexName

## 脱敏与文案
- 姓名只保留首字（如 张***）
- 手机/证件保留前 3 位和后 4 位（如 138***5678 / 320***1234）
- token 保留前 4 位和后 4 位（如 ABCD***KLMN）
- 仅缺手机号 → 新文案「缺少手机号，请至苏服办-个人信息绑定手机号」；缺多个字段 → 原拼接文案

## 分支与提交
- 子模块分支 dev_wuxi-sfb，提交 9f04cb5（已推送，2026-11-13）
- 父仓分支 main-sfb，gitlink 提交 a672d2e（已推送，2026-11-13）

## 打 Tag 约定
- 父仓 zhi2-mobile-shimin-h5-c-unlimited 与子模块使用同名附注标签（格式 `YYYYMMDDHHmm`），注释带子模块短哈希
- 子模块 tag `202611131548`（分支 dev_wuxi-sfb，提交 9f04cb5，远程 30887b1，2026-11-13），注释「苏服办跳转增加链路日志（密文脱敏）+ 缺失手机号提示改为绑定指引（禅道任务 2461）」
- 前一 tag `202611041456` 同为附注 tag、父仓+子模块同名成对推送

## 缺陷修复与任务
- 辅助函数置于调用点之后触发 TDZ（暂时性死区），已前置
- 脱敏对姓名执行 slice(-0) 导致原样输出，已改为只保留首字
- 2026-11-24 首页房屋标题变「我的房屋」占位缺陷：mergeLingXiHouse 原把 complexName 默认填成字面量「我的房屋」并 unshift 到列表首位，覆盖接口刚拉取的真实小区名；已改为命中已有房屋时保留接口返回的真实 complexName/address（仅灵犀返回非空真实值才覆盖）、未命中不再新增占位行、houseId 缺失直接返回，改动在 src/utils/portal.js
- 上述修复验证：node --check 通过、npm run build 退出码 0、9 项逻辑用例全 PASS、agent-browser 打开构建产物首页实机渲染正常并经用户确认；因环境无后端与 authCode，未跑端到端第三方选屋回跳
- 该修复 2026-11-24 尚未提交：用户已授权提交并推送，子模块 dev_wuxi-sfb 的 add/commit/push、推送前 ahead/behind 核对、2 条疑预存 lint 报错判定、远端 SHA 核对、验证截图清理与 concise-report 待接续会话执行（交接文档 D:\plan\无锡市区小程序嵌入H5\handoff\chain-house-title-placeholder\hop1.md）
- 禅道 2461：wait → done，consumed 1.00 / left 0.00，finishedBy tiany，派回提出人 zhengxin，action 92821 写入根因与验证证据（2026-11-13）

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_admin",
  "source_extraction_id": "22496bd112ec489790000563131e3c2e",
  "version": 3,
  "memory_type": "entities"
}
-->