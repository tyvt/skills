# 自治用户授权详情页实现
园区物管2.0 的 zhi2-web-admin 已按设计图与 procedure/detail.vue 模板实现 autonomy/userAuth/detail.vue 详情/新增/编辑页。

## 页面结构
- 沿用 detailMixins + Headline + DetailTemplate（查看）/ 表单（新增/编辑）
- 底部 operation-btn-group：biz-state="0"、showSubmit="false"（无审批流）

## 表单字段
- 组织类型：字典 autonomy_organization_type，新增可选、编辑禁用
- 组织名称：按组织类型弹窗选择 ownerCommitteeLog
- 所属物业管理区域：选组织后自动带出，只读
- 登录名/用户密码：新增时接口生成，只读，密码默认与登录名一致
- 用户姓名：只读输入 +「选择」按钮，从委员列表选人
- 性别/手机号码：选人后可改，手机号校验
- 状态：单选，字典 sys_normal_disable，默认 0（正常）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/autonomy/userAuth/detail.vue、index.vue；参考 procedure/detail.vue
- 所属项目：园区物管2.0；来源会话：c9a03628-31e0-4f0e-bc33-82c25af46a98；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "userauth_detail_page",
  "source_extraction_id": "36621e6addfb4001a7f9fe8c070ff065",
  "version": 1,
  "memory_type": "entities"
}
-->