# 开户申请已备案筛选字典编码对调修复
苏住房G项目修复监管账户列表因字典编码对调导致「已备案/审核中」筛选结果相反的缺陷。

## 问题根因
- 筛选「已备案」实际传 bizStatus=1，但系统约定 1=审核中、2=已备案
- detail.vue 按 bizState==1 审核、=='2' 已备案；列表却用 getDicts('BIZ_STATE')
- UAT 环境该字典将 1、2 的文案与后端编码对调，导致选「已备案」查到审核中数据、反之同理

## 修复方案
- 在 zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/index.vue 将业务状态字典改为与详情页、全局 store 一致的 biz_state
- 约定：biz_state（0待提交 1审核中 2已备案）；勿用 BIZ_STATE，部分环境 1/2 对调

## 验证与归属
- 所属项目：苏住房G；来源会话：7fa26724-2d29-4dbe-accb-87098bace420；代码基线：none
- 验证证据：extracted source=cursor project=苏住房G；涉及 detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_dict_fix",
  "source_extraction_id": "abdd97970a8a4abf9d8be3872a649e61",
  "version": 1,
  "memory_type": "entities"
}
-->