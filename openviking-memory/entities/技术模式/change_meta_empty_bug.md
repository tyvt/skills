# 淮安物管变更记录弹窗审计字段为空
变更记录弹窗顶部「变更时间/变更人/变更说明」显示空，但表格字段对比正常，因 detailCallback 合并遗漏顶层审计字段。

## 问题根因
- 变更单详情接口常把 createTime、createUser 等审计字段放在 response.data 顶层，业务变更字段放在嵌套对象（如 companyRecordChange）。
- 若 detailCallback 只 Object.assign(form, data.companyRecordChange)，顶层审计字段进不了 form，弹窗取 meta 时为空。
- 不同业务变更单说明字段名不一致（changeReason / changeDescription / remark 等）。

## 解决方案
- 调整 detailCallback 合并顺序：先合并 response.data 顶层通用字段进 form，再合并嵌套变更体（后合并同名键可覆盖业务字段）。
- 弹窗侧用 resolveChangeMeta（或等价函数）按候选字段名依次取值：时间（changeDate、updateTime、createTime…）、人员（updateUser、createUser…）、说明（changeReason、changeDescription、remark…），有则展示无则隐藏。
- 若制单信息也为空需后端补审计字段，前端无法凭空生成。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：会话 95b62123 用户报「右边有大量空白，上面三个字段都没有值」；结论为 detailCallback 先合并顶层再合并嵌套，新增 resolveChangeMeta 兼容多字段名。
- 与已知差异：#1215 是 contentInfo visible + 只取 data.summary；#1098 是 detailCallback 不 return 导致 loading/残留。
- 涉及文件：companyManagement/change/detail.vue、change-record-dialog.vue、mixins/detailMixins.js；所属项目：淮安物管；来源会话：95b62123-9914-4e98-aca3-4d7acff520aa；代码基线：22a1d9d。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_meta_empty_bug",
  "source_extraction_id": "ef9840a3c94e4e1dbb34e9f98d363bef",
  "version": 1,
  "memory_type": "entities"
}
-->