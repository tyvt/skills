# 物业管家编辑仅开放管理范围与人员姓名
物业管家编辑态仅允许修改管理范围与物业服务人员姓名，其余字段只读，通过白名单与校验跳过实现。

## 问题与根因
- 业务要求编辑时只能改管理范围，后追加人员姓名也可改；整表单可编辑会误改派生/归属字段破坏关联
- 新增态必须全字段可填，不能全局 disabled 一刀切

## 解决方案
- 以字段白名单实现：formMode === 'edit' 时对白名单外 form-item 加只读态，新增/查看走原逻辑
- 只读字段若挂在 el-form 上，rules 必须同步跳过，否则禁用必填字段导致整表 validate 失败
- 切换人员时只更新人员相关字段，管家记录 ID 与管理范围原样保留回写，禁止先清空再重填
- 保存载荷仍提交全字段，仅前端限制可改项

## 验证与归属
- 验证证据：会话 32c1cf90，用户诉求编辑仅两字段可改并说明换人保留主键/范围
- 涉及文件：zhi2-web-admin/src/views/property/propertyManager/detail.vue；propertyManager/index.vue；propertyWorker/detail.vue；zhi2-web-admin/src/mixins/form.js
- 所属项目：苏住房G；来源会话ID：32c1cf90-d6d4-4f69-88c9-a9a6df3519ff；代码基线：805ea8c

<!-- MEMORY_FIELDS
{
  "category": "代码模式",
  "name": "property_manager_edit_whitelist",
  "source_extraction_id": "abebe2c56425424f94ff991329e745aa",
  "version": 1,
  "memory_type": "entities"
}
-->