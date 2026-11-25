# ZenTao Bug 6950
禅道缺陷 6950：2026-11-24 通过 DBX 事务直连完成 resolved 回写，并挂上复现截图附件。

## 基本信息
- 回写元数据：product=10、project=193、execution=194、openedBy=zhoudongdong。
- 回写目标：status=resolved、resolution=fixed、resolvedBy=tiany、resolvedBuild=trunk。
- 备注内容：根因、修复方案、验证数据、提交号与发布 tag，并内嵌 `<img src="{24229.png}">` 附件。

## 回写过程
- 复用 hop2 开启且跨会话仍存活的 DBX 事务 session（`transaction_state: active`），未重开事务、未重复执行 UPDATE。
- SQL 序列由 `zentao-resolve.mjs` 生成（`--attach` 转为 comment 内嵌图并转义引号）后照抄执行，未手拼 SQL。

## 验证结果
- 事务内校验与 COMMIT 后复核双校验：zt_bug 为 resolved/fixed；zt_action 99120（actor=tiany、files=24229、comment 含内嵌图 has_img=1）；zt_file 24229 已挂到 bug 6950 下（objectType 由空改为 `bug`、objectID 由 0 改为 6950），否则附件不显示。
- COMMIT 返回 `transaction_state: idle`/`outcome: committed`，随后用无 session 连接复核并 close session。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6950",
  "source_extraction_id": "255c2c242ef9440dadbe93cd5fd1935c",
  "version": 1,
  "memory_type": "entities"
}
-->