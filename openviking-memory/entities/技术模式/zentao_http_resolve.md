# 禅道 Bug 回写须提交 HTTP 表单
禅道 bug 从 active 改 resolved 并填「解决方案」时，须通过 HTTP 表单提交，不能直接 SQL UPDATE zt_bug，否则 zt_action 无记录、操作历史空白。

## 根因
- 禅道状态流转与解决方案是「动作」驱动：状态变更和备注由 zt_action 承载，直接改主表只改结果、不留动作。

## 服务端强校验三坑
- 必须原样回传表单 <input name="uid">（从 <form id="zin_bug_resolve_{id}_form"> 抓），缺了提交后只回显页面、无任何变化。
- resolvedBuild 必填（传 trunk），页面不显示红星但服务端强校验，缺了返回 {"result":"fail","message":{"resolvedBuild":["『解决版本』不能为空。"]}}。
- resolution 只认枚举 value：fixed / bydesign / duplicate / external / notrepro / postponed / willnotfix / productized，传中文「已解决」校验失败。

## 解决方案
- 表单提交前抓齐 uid / resolvedBuild / resolution 三项，resolution 用枚举 value。
- 提交后回查 zt_bug（状态）与 zt_action（操作历史），两张都对才算闭环。
- 状态流转边界 active → resolved → closed，关闭是另一步别混做。
- 解决方案备注用三段式：根因（机制）+ 修复（文件/接口/字段）+ 提交号。
- 指派人 assignedTo 按「谁提单谁回归」回指提单人，汇报里写明此选择。
- zui-create 组件 JSON 用正则抽取 → html.unescape → json.loads → 按 name 取 items 解析。

## 验证与归属
- 验证：会话 10c9e5a2（基线 8cd518d）用户诉求 3；解决方案备注写入 zt_action id=81682。
- 涉及文件：C:/Users/Administrator/.dsh/skills/zentao-analyzer/zentao_resolve.py、SKILL.md「六、回写禅道」章节。
- 来源会话：10c9e5a2-a290-4d2f-903a-f6b3dabeb01a；代码基线：8cd518d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zentao_http_resolve",
  "source_extraction_id": "59460bd227de48aaac7eed677d51a6cc",
  "version": 1,
  "memory_type": "entities"
}
-->