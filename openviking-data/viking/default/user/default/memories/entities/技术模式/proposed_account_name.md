# 拟开户账户名称字段实现
苏住房G 项目 pubRegulatoryAccount/detail.vue 已新增「拟开户账户名称」字段并按管理主体类型自动生成名称。

## 实现内容
- 在「基本信息」联系电话后新增 proposedAccountName 输入框，查看模式 contentInfo 同步展示，增加必填校验
- 物业服务企业('1')：管理主体名称 + 物业管理区域名称 + 公共收益，不可编辑
- 业委会('0')：管理主体名称 + 公共收益，不可编辑
- 物管会('2')：管理主体名称 + 公共收益（默认），可编辑

## 联动触发
- changeType() 切换管理主体类型时自动更新名称
- showCompanyDialog() 选择管理主体名称时自动更新
- showPropertyProjectDialog() 选择物业管理区域时自动更新

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue、src/api/benefit/pubRegulatoryAccount.js
- 来源会话ID：ea26c60b-ee52-4d27-b035-5fdd8146dfa7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "proposed_account_name",
  "source_extraction_id": "cc5f4cc126b94211921fea7c38780aa8",
  "version": 1,
  "memory_type": "entities"
}
-->