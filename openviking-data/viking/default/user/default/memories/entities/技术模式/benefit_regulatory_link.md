# B端收益类新增页初始化监管提示链接触发无授权菜单
用款申请等 benefit 模块新增页初始化阶段构建「前往开户/签署协议」链接若调 getRouterPathByFilePath，B 端用户无菜单会抛「没有授权相关菜单」。

## 问题根因
- 新增页自动弹「选择物业管理区域」；初始化链接触发菜单查找抛错
- B 端用户常无财务管理下开户/协议菜单，打开页面即抛错

## 解决方案
- 改用 getBTerminalRegulatoryDialogConfig（内部 getRouterPathByFilePathOptional，无路由静默不展示链接）
- 监管协议页可 withAgreement:false 仅保留开户
- 用户主动点击跨模块跳转仍用严格 getRouterPathByFilePath，无权限提示属预期

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 b2ceb96d 全局排查 10 个 benefit/detail.vue，根因定为新增页自动弹窗+初始化链接触发；ruoyi.js 新增 getBTerminalRegulatoryDialogConfig
- 涉及文件：utils/ruoyi.js、benefit/pubUseMoneyApply/detail.vue、pubExpenditureContract/detail.vue、pubPaymentNotice/detail.vue、parkingSpaceContractFiling/detail.vue、pubRegulatoryAgreement/detail.vue
- 所属项目：园区公共收益；来源会话：b2ceb96d-3372-48d3-9c13-5aed7776c612；代码基线：08d3255

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_regulatory_link",
  "source_extraction_id": "684fafd2b29640698c2b0bf8580c7d26",
  "version": 1,
  "memory_type": "entities"
}
-->