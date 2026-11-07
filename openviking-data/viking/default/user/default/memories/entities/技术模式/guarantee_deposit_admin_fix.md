# 保证金账户新增管理员不再自动带出
产品2.0 项目修复保证金账户新增时管理员账号自动带出账户的问题。

## 主要改动
- 管理员账号打开新增弹窗时账户字段为空，需点击「账户名称」手动选择
- B 端从业人员仍自动带出当前物业管理区域对应账户
- 表单改为单列布局（`el-row` + 各字段 `el-col` 全设为 24 栅格），符合项目弹窗规范
- 管理员点击账户名称弹出选择账户对话框，可按左侧区域树筛选，选中后自动填充账户名称和业务账户

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`guaranteeDeposit/components/AddDialog.vue`、`guaranteeDeposit/components/index.vue`
- 所属项目：产品2.0；来源会话：8cce6e5f-7212-46e4-b856-ac58b146cde8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_admin_fix",
  "source_extraction_id": "fa995b7b3e044e24b63c316e5a13d398",
  "version": 1,
  "memory_type": "entities"
}
-->