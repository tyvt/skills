# Register Query Page Branch Gap
淮安存量房 当前分支未合并提交致用户注册查询页缺失的已知状态。

## 问题背景
- 当前分支 huaian-all-cunliangfang-dev-v2.2 未合并提交 6b96b326a。
- 文件 src/views/system/publicPage/index.vue 与 detail.vue 仅存在于 origin/develop/v2.6.1-huaian。

## 根因与影响
- 根因为分支未合并指定提交，致注册查询页在当前分支不可用。
- 相关变更文件还涉及 ChangePasswordDialog、ctUserUnifiedBusiness、system/user、property/appUserAudit、subscription/user、mixins、RegisterLogin.vue 等。

## 验证与归属
- 验证证据：extracted source=cursor session=24586f68-d380-4dde-b194-a6083ca328dd
- 所属项目：淮安存量房

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "register_page_merge_gap",
  "source_extraction_id": "078a8106ac514c8793e34bbb17ed1b81",
  "version": 1,
  "memory_type": "entities"
}
-->