# 选开户银行弹窗多模块复用靠sourceModel+业务标记区分
苏住房G同一套选开户银行弹窗被多模块复用，业务域由 sourceModel + 业务标记参数决定，新模块接入须全量回扫消费方。

## 问题现象
- 开户类页面选银行公共弹窗，左侧 queryStartBank 授权列表按业务模块隔离，多模块共用同一入口
- 新增公共收益/开户申请（benefit/pubRegulatoryAccount、pubRegulatoryAgreement）复用旧阳光物业逻辑，选物业管理区域后管理银行下不出现已授权银行

## 根因
- 公共弹窗只认默认模块维度 sourceModel=property；新模块 benefit 需自身数据源且后端要求额外标记 isPubRegulatoryAccount=1
- 两者缺一接口按默认过滤返空，表象「授权了却不显示」易误判数据没配

## 解决方案
- ①定位弹窗取数入口收口在 src/utils/workBank.js + src/api/benefit/pubRegulatoryAccount.js，确认维度是 sourceModel 非页面路径
- ②新模块显式传 sourceModel=benefit 并补 isPubRegulatoryAccount:1，queryStartBank 与网点列表两接口都要带
- ③改造后按消费方回扫：覆盖阳光物业侧 property/propertyAccount/detail.vue、property/account/detail.vue、property/account/components/AccountDialog.vue 统一补标记但保持 sourceModel=property

## 验证与归属
- 验证：会话 a107a608 开户申请选区域后银行不显示，请求模块应是 benefit 实际 property；补 isPubRegulatoryAccount=1；三个 property 侧文件同步补参模块仍 property
- 涉及文件：src/utils/workBank.js、api/benefit/pubRegulatoryAccount.js、views/benefit/pubRegulatoryAccount/detail.vue、benefit/pubRegulatoryAgreement/detail.vue、property/propertyAccount/detail.vue、property/account/detail.vue、property/account/components/AccountDialog.vue
- 所属项目：苏住房G；来源会话：a107a608-9c60-40c0-95c7-bcb174732ca2；代码基线：9b8845d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_dialog_sourcemodel_scan",
  "source_extraction_id": "04514741d2024b92a72103d8b2d8e96e",
  "version": 1,
  "memory_type": "entities"
}
-->