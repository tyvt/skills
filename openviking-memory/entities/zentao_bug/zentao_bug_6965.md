# 禅道 Bug 6965
禅道缺陷 6965：2026-11-25 完成「成功态绿勾与本次导入结果同行」修复（commit 9e6e91424/dev）的禅道带图回写与 Temp 清理，链路终止；bug 原已 closed，仅追加 commented 备注不改状态。

## 回写背景
- 交接链接续目标为禅道回写（附图）与清理 Temp 两项未完成项；代码修复、提交推送（dev/9e6e91424）与用户验证通过已完成。
- 验证图确认弹窗中绿勾与「本次导入结果」已同行，修复生效。
- #6965 已 closed，且已有 15:15 resolved 回写（失败态红色图标修复 commit 81d7b7262，附 24372.png），与本次成功态绿勾是不同修复点。

## 回写过程
- 决策：不重复插 resolved、不改状态，追加一条带图 `commented` 备注说明成功态修复。
- 验证图上传新禅道得 fileID=24392；`zentao-resolve.mjs` 无法直接生成 commented，手写严格 14 列 SQL。
- 事务写入：actor=tiany、action='commented'、files='24392'，comment 含根因/修复/验证与内嵌图；UPDATE zt_file 24392 挂到 bug 6965。
- 元数据 product=17、project=187、execution=188。

## 验证与收尾
- 事务复核通过：新备注 99673（action=commented、files=24392），附件 24392 已挂 bug 6965；COMMIT 成功并关 session。
- 原有失败态回写（81d7b7262）与 closed 状态保持不变；清理 Temp 下全部 18 个 `xc6965-*` 过程产物并复核剩余 0。
- 两项未完成项清零，无后台任务、无待定项，链路终止。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6965",
  "source_extraction_id": "ec4c54bede74440ebd578e4d3f2c854d",
  "version": 1,
  "memory_type": "entities"
}
-->