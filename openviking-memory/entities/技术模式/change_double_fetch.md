# 变更详情重复调备案detail致状态被覆盖
变更详情页顺手加 companyRecord/detail 请求并把返回整表 Object.assign 进 form，导致审批/提交按钮不显示、编辑态误锁，控制台无报错。

## 根因分析
- 一次页面里对同一业务对象有两份取数结果，后到的覆盖先到的
- 变更单与备案单是两张表、两套状态机：备案单已备案(2)、变更单在途(1)，谁后合并谁的 bizState 生效
- 产品2.0 不能拿 V3 的 displayStatus 兜底，2.0 没有该字段

## 排查套路
- 在 Network 确认有哪些 xxx/detail 被打
- 搜 form.bizState 所有赋值点，尤其是 load* 回调里的合并
- 若请求只为对比/只读展示，改写入独立 beforeForm 等兄弟对象
- 用接口原文（变更单 bizState=1）与页面实际渲染值对账，而非先怀疑 OperationBtnGroup 权限或 show-* 开关

## 涉及文件与归属
- zhi2-web-admin/src/views/company/companyManagement/change/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- 所属项目：产品2.0；来源会话 88acb085-eda3-448f-892d-0b062cf5f142；代码基线 62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_double_fetch",
  "source_extraction_id": "ec9ce0013b2443a8a8fee4d4e2edd636",
  "version": 1,
  "memory_type": "entities"
}
-->