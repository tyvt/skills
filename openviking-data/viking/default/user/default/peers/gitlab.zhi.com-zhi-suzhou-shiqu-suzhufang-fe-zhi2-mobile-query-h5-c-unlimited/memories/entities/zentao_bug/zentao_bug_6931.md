# 禅道 Bug 6931 检查中修改评价等级
苏住房防汛 C 端移动查询 H5 缺陷：街镇/区县/市级检查中修改评价等级后题目未按新等级重载，2026-11-24 hop3 定位为后端未透传 grade 入参。

## 现象
- 「01 综合能力」的「评价等级（可修改）」可选 5 个市标等级，切换有确认弹窗，但改等级后题目内容不变（hop2 实机确认入口可见）。
- 前端 `/check/start` 请求 body 已正确携带 `gradeComprehensiveLevel`="1"/"2" 及另四类等级（req 22308.143/144 逐字段核对）。

## 根因（2026-11-24 实证）
- 三次请求返回的五类 evalLevel 恒为 3/3/4/2/5，综合能力 contentId 恒为 …0031,0032,0033，与请求等级无关，说明部署版后端忽略 grade。
- `H5StdEvalCheckServiceImpl.start()` 构造 `StdEvalCheckInitDto` 时只 set complexId + checkType，未拷贝 grade，`initItems()` 遂回落备案等级；`H5CheckStartDto` 原本无 grade 字段。
- `GET /checkRecord/initItems` 实测支持 grade：g=1→…0001-3、g=2→…0016-8、g=3→…0031-3，证明题目本身可按等级取回。

## 修复与验证状态
- 用户直接授权改后端后拉取最新代码（分支 `develop/v2.6.2-suzhufang-dev`），改 2 文件：`H5CheckStartDto` 加 5 个 grade 字段、`start()` 透传 grade（diff 21 行新增、无删除）。
- 本地补齐缺失依赖（zhi2-property-api、common-framework-api 等）后 `mvn compile` EXIT=0 通过。
- 曾阻塞：nginx 8095 上游是远程测试服 192.168.1.31，本地改动不生效；hop4 已本地打包并切换 nginx 路由，用 curl 证实 grade 透传生效。
- hop5 用 agent-browser 完成 PC 与移动端 390×844 实机验证：市标三级(grade=3)→首题 `...000031`，市标一级(grade=1)→`...000001`，改回三级→`...000031`；响应 `evalLevel` 为 2/1/2，其余四类 grade 全程 3/4/2/5 不变，`levelEditable=true`。移动端另有底部五级 picker + “修改评价等级”二次确认弹窗（提示已录入得分/说明/图片清空）。
- 用户确认通过后提交推送：前端 `dev` c6fb38e、后端 `develop/v2.6.2-suzhufang-dev` 8855536，远端/本地 SHA 一致；`npm run build` exit=0（仅 Sass 废弃警告）。
- 禅道 6931 已回写为 resolved/fixed，comment 内嵌移动端 GIF(24168) 与确认弹窗 PNG(24169)，附件挂载成功，事务已提交。
- 仅剩清理（恢复 nginx、停 PID 6508、删产物、job_list），已交接 hop6 于 2026-11-24 15:57:57 接续。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6931",
  "source_extraction_id": "cc2cabee31a04543999aef0c83603367",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->