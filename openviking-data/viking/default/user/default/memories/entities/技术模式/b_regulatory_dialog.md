
# B 端监管弹窗链接初始化修复
园区公共收益项目全局修复 B 端新增页自动弹窗报错问题。

## Description
- 根因：B 端无财务菜单权限时 getRouterPathByFilePath 找不到路由直接报错
- 新增工具 getBTerminalRegulatoryDialogConfig（ruoyi.js），用 Optional 路由无权限静默跳过，支持 withAgreement:false
- 统一修复 10 个页面含用款申请、经营资源租赁申请、支出合同备案、资金缴款、停车泊位租赁合同备案等 detail.vue

## Relations
- 来源会话：b2ceb96d-3372-48d3-9c13-5aed7776c612（extracted source=cursor）
- 所属项目：园区公共收益；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "b_regulatory_dialog",
  "source_extraction_id": "d4a2273348f648869d27d1c30c8e9cb9",
  "version": 1,
  "memory_type": "entities"
}
-->