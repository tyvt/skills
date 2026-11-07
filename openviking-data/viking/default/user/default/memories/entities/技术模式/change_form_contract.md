# 变更详情双数据源契约：form只放变更单、beforeForm只放对比字段
企业基本信息变更详情需展示「变更前/变更后」对比，页面同时请求 companyRecordChange/detail 与 companyRecord/detail，误将备案单整表合并进 form 污染 bizState。

## 错误原因
- 产品2.0 没有 displayStatus（那是 V3 口径），变更单状态唯一来源是 companyRecordChange/detail 返回的 bizState（例：在途=1）
- 任何把备案数据 merge 进 form 的写法都会污染判定，按钮组/编辑门控全部读 form.bizState，表现为状态对但按钮不对

## 契约规则
- form 只来自 companyRecordChange/detail
- beforeForm 只存对比业务字段，由 pickChangeBeforeForm 从 originInfo 或 companyRecord/detail 白名单挑（企业名称、地址、法人等），显式不含 bizState、approveState
- loadChangeBeforeForm 拉备案数据只写 beforeForm，查看态与编辑态都加载
- 新增（formMode=add）预填走 mergeChangeRecordIntoForm，同样排除 bizState、companyRecordChangeId

## 涉及文件与归属
- zhi2-web-admin/src/views/company/companyManagement/change/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/detail.vue
- zhi2-web-admin/src/mixins/detailMixins.js
- 所属项目：产品2.0；来源会话 88acb085-eda3-448f-892d-0b062cf5f142；代码基线 62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_form_contract",
  "source_extraction_id": "ec9ce0013b2443a8a8fee4d4e2edd636",
  "version": 1,
  "memory_type": "entities"
}
-->