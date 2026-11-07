# 弹窗提交 close 仅在 then 内导致关不掉
审查弹窗「点确定后关不掉」时，发现 close() 写在 request().then(res=>res.code==200) 分支里，接口 reject 会静默导致弹窗无法关闭。
## 问题根因
- 全局 request 封装下，业务码非200、网络错误、HTTP异常均走拦截器 Promise.reject，不进 then，close() 不执行且无 catch/finally 兜底。
- then 内再判 res.code==200 属双重判断，成功体缺 code 字段（undefined==200）也会假失败。
- 手动输入金额为空等也会导致 reject 不关；close() 自身抛错（如 $refs 已卸载）会造成「半关」观感。
## 解决方案
- 提交请求加 catch/finally 或成功后无条件关弹窗。
- 补提交前缺漏的表单 validate，避免空值 reject。
- 分析「确定后不关」先看三点：close 是否只在 then 内；拦截器 reject 行为；then 内 code 判断是否重复。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 427d58f8 分析 ScopeSelectDialog 与 OpeningBuildingDialog 的 submitForm，close() 仅在 then+res.code==200 内且无 catch/finally，提交前未校验。
- 涉及文件：zhi2-web-admin/src/views/maintenance/components/OpeningBuildingDialog.vue、zhi2-web-admin/src/utils/request.js。
- 所属项目：产品2.0；来源会话ID：427d58f8-75b8-425c-af42-6fe424dbe22b；代码基线：6b9d9d7。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_close_reject",
  "source_extraction_id": "95867fed974048d29a326f877b61667d",
  "version": 1,
  "memory_type": "entities"
}
-->