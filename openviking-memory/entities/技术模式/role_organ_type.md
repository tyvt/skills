# 角色下拉仅查机构类型需传 organType
园区公共收益项目查询机构类型角色时，接口除 roleType: '2' 外还须传 organType，已修复。

## 修改内容
- loadRoleOptions：增加 organType: this.form.accountType（监委会 4-1、业委会 4-2、物管会 4-3）；未选组织类型时不发请求
- initDict：去掉页面初始化角色请求，改为在选择/切换组织类型、路由预填组织类型、编辑/查看详情加载完成后加载

## 使用说明
- 需先选择组织类型，角色下拉框才会加载对应机构角色列表

## 验证与归属
- 涉及文件：ownerCommitteeWorker/detail.vue、system/user/detail.vue
- 所属项目：园区公共收益；来源会话：9878244d-a568-49fa-8751-9ff53a3f3559；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "role_organ_type",
  "source_extraction_id": "41ebe72cbac94dce89aa5307c597c661",
  "version": 1,
  "memory_type": "entities"
}
-->