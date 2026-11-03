# 自治用户授权组织核验失败级联清空
园区物管2.0 中 autonomy/userAuth/detail.vue 在组织名称核验失败或切换业务类型时须级联清空组织与从属用户字段。

## 问题根因
- onOrganizationSelected 调 checkUserUnique 核验组织后，接口失败表单仍保留上一轮选择/回填，用户会误以为已核验通过
- handleBusinessTypeChange 切换业务类型时也可能残留无效数据

## 解决方案
- catch 中不能只 toast：须调用 clearOrganizationFields() 统一清空组织名称、组织版本 ID、物业管理区域、登录名
- 复用 clearMemberFields 清空姓名/性别/手机号等从属字段；切换业务类型也应走同一清空方法

## 验证与归属
- 验证：会话 04c36a87 核验失败与换组织失败均需在 catch 中清空组织及关联用户字段
- 涉及文件：zhi2-web-admin/src/views/autonomy/userAuth/detail.vue
- 所属项目：园区物管2.0；代码基线：5a288f142；来源会话：04c36a87-d4a7-48a6-bd8d-6bdcfbe29f08

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_verify_cascade_clear",
  "source_extraction_id": "1a80be442ad2431a98fa878c7d3779f0",
  "version": 1,
  "memory_type": "entities"
}
-->