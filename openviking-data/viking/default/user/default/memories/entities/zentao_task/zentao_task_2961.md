---
audit_status: valid
last_checked: 2026-11-27T03:48:40+08:00
verdict_note: 实机核对：江阴H5 src/pages/login.vue(75) 同时含「缺少 option」与「无法登录」，与任务最终验收提示一致；核心代码证据吻合。
---
# 禅道任务 2961
禅道任务 2961「江阴智慧物业 C 端去除生产写死账号信息」于 2026-11-26 完成验证、提交推送、带图回写并终止链路。

## 任务与验收
- chain_id=江阴C端2961去除写死账号；本跳 hop2（文档 hop=1、maxHops=10）；文档第4节未完成4项所以继续，完成后清空未完成项、不排下一跳。
- 原始目标为去除生产写死账号信息；用户追加验收口径：不带 option 参数时不跳转账号密码页，只在本页提示「缺少 option 参数，无法登录」。
- 冲突说明：文档称 C 端在 D:/repository/江阴H5、当前工作区是 B 端；本会话 cwd 为 D:/repository/江阴公共收益，最终以文档为准。
- 已完成不重跑：4处凭据清除、login.vue 改造、静态 grep、3次 build 通过、旧逻辑验证截图（仅过期参考）。

## 实机验证
- 站点 http://localhost:8102/#/pages/login 可达（HTTP 200），构建时间 2026-11-26 16:05 为最新构建。
- 最终验证：URL 停留 /pages/login、未跳 /index，快照显示「缺少 option 参数，无法登录」；截图 C:/Users/Administrator/AppData/Local/Temp/zentao-2961/login-tip-20261126-161136.png 自检有效（24KB、1256×625），页面显示「共有资金」和提示，无账号密码输入页、无写死账号。
- 用户已确认验证通过；按禅道任务免二次问规则默认提交推送并回写禅道。

## 提交与推送
- H5 仓 main 分支 5 个 dirty（4目标文件 + 预存 src/pages.json）；ahead=0/behind=0 无需 pull；无本地 eslint，lint 跳过，改动由 build 的 rollup/vue 编译验证。
- 只暂存并提交4个目标文件，pages.json 未纳入；git diff --cached 复核与交接文档一致。
- commit 288f186 已推送 origin/main，推送后 ahead=0/behind=0，仅剩预存 src/pages.json 未提交。

## 回写与收尾
- 禅道任务 2961 原为 wait，回写 status=done、assignedTo=zhouzhijing、finishedBy=tiany；comment 附验证图 fileID=24621，zt_action=finished 且 files=24621，zt_file 挂 task/2961。
- 任务回写 product=`,3,8,10,16,22,26,42,`、project=150、execution=151、extra空、vision=rnd；resolve 脚本为 bug 专用，task done 需手写事务 SQL。
- 中文 comment 曾改用 base64 避免 bash 乱码，但事务会话禁止 FROM_BASE64；最终直接内联 UTF-8 中文，三条 SQL 执行成功并复核后提交。
- 收尾：3个后台 job 均 killed/completed，无运行中任务；$env:TEMP/zentao-2961/ 经前缀校验后删除并复核 GONE。

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2961",
  "source_extraction_id": "0ebb0b0928084e26b95117d6d3519032",
  "version": 2,
  "memory_type": "entities"
}
-->