# 物业全域管理台账 pubLedger 展示口径
淮安物管物业全域管理台账 pubLedger 汇总物业管理区域在多业务态链路上的状态，支持筛选与导出。

## 业务与接口
- 列表汇总物业管理区域在企业授权、物业合同录入、公共收益管理主体备案、公共收益开户等链路上的状态，支持按街道/社区/物业管理区域筛选与导出。
- 分页接口 GET /property/pubLedger/page，查询字段含 subdistrictName、communityName、complexName、pageNum、pageSize。

## 列展示约定
- 企业授权：已授权（括号展示物业企业名称）/未授权（无关联企业）。
- 合同录入/公共收益管理主体备案/公共收益开户：按业务 bizState 显示待提交、已备案；无备案记录显示「未录入」；审核中按状态并在括号展示当前待办审核节点。
- 楼幢授权数量：展示该区域关联楼幢数。
- 公共收益开户账户回传状态：区分未回传/已回传（审批中是否已回传账户）。

## 实现与归属
- 实现落点 property/pubLedger/index.vue；导出需 exportLoading + 按钮 loading + download 的 finally 复位。
- 验证：会话 968e6aef（2026-06-30，基线 1b9f773）用户给出台账模板与 Apifox 契约要求建表统计与导出，追加导出无 Loading 后补 exportLoading。
- 涉及文件：property/pubLedger/index.vue、api/index.js；所属项目：淮安物管；来源会话：968e6aef-a864-48b6-8689-93f6af2352ef；代码基线：1b9f773

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "物业全域台账pubLedger",
  "source_extraction_id": "11edc2e7c0844408a032189da68a63f0",
  "version": 1,
  "memory_type": "entities"
}
-->
