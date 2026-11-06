
# 物业管家详情页时间字段被覆盖修复（苏住房G）
苏住房G 项目 propertyManager/detail.vue 修复物业管家详情页创建/更新时间显示错误问题。

## 问题原因
- 详情页 detailCallback 将关联的物业服务人员（tmfPropertyWorker）数据合并进 form，其 createTime、updateTime 等字段覆盖了物业管家自身的创建/更新时间。
- 页头 HeadTitle 读取 this.form.createTime / this.form.updateTime，导致新建管家后显示的是所选物业服务人员的时间（例如 2026-07-31、2026-08-25），而非管家记录本身的时间（如 2026-08-26 15:08:44）。

## 修复内容
- detailCallback：合并 worker 数据后，从 response.data 恢复管家自身的 createTime、updateTime 及 createUser、updateUser 等元数据。
- setStaff（编辑模式重选人员）：同样保留上述管家元数据，避免编辑时被覆盖。

## 涉及文件
- zhi2-web-admin/src/views/property/propertyManager/detail.vue
- zhi2-web-admin/src/views/property/propertyManager/index.vue
- zhi2-web-admin/src/mixins/detailMixins.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：d3762f0d-f15f-422b-9579-d05d71e9fa27；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "manager_time_fix",
  "source_extraction_id": "35152ab6f89644c1b5de7b32d547e962",
  "version": 1,
  "memory_type": "entities"
}
-->