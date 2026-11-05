# 组织工作人员列表字段映射修复
修复园区公共收益项目组织工作人员列表页字段绑定不一致问题。

## 问题原因
- 列表接口返回字段与前端绑定不一致：组织类型原绑 businessType 实返 accountType；用户状态原绑 enable 实返 userStatus；角色 roleName 正确。

## 修改内容
- `ownerCommitteeWorker/index.vue`：组织类型 businessType→accountType，字典 committee_type→sys_account_type_all（与系统用户一致）
- 用户状态 enable→userStatus，仍用 sys_normal_disable 字典
- 同步更新 queryParams 和筛选项 model 字段
- 角色映射正确无需改
- 验证接口 `/autonomy/ownerCommitteeWorker/page`

## 验证与归属
- 涉及文件：index.vue 等
- 所属项目：园区公共收益；来源会话：b6d6fab6-0ca4-4685-9fa8-8c9df7a6aefd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "orgworker_list_fieldmap",
  "source_extraction_id": "4e197fd9c17d47ec9857dc89e475924b",
  "version": 1,
  "memory_type": "entities"
}
-->