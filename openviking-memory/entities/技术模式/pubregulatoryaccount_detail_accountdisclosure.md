# 开户申请详情账户公开固定传值
淮安物管收益监管开户申请详情页要求账户始终公开，前端固定传 accountDisclosure=1。

## 业务要求
- 账户始终公开，用户不可在页面修改该字段。
- 移除操作栏「设置账户公开」按钮及 accountDisclosureDialog 相关逻辑。

## 实现要点
- 表单初始值设 accountDisclosure: '1'。
- 在 submitForm 提交前统一 this.form.accountDisclosure = '1'，新增与修改均固定传公开。
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue

## 验证与归属
- 验证：会话 10ceac4a 用户通过截图/diff 提出改造；结论三步（隐藏按钮、默认公开、保存固定传值）。
- 所属项目：淮安物管；来源会话：10ceac4a-2a59-4904-83fb-1575abd77e6f；代码基线：53c813e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubRegulatoryAccount_detail_accountDisclosure",
  "source_extraction_id": "1b1428061edc4326a5a704254c0befaf",
  "version": 1,
  "memory_type": "entities"
}
-->