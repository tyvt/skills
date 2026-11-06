# 资产租赁详情辅助链接报错修复
资产租赁申请详情页辅助链接改用可选路由解析函数，修复无权限时弹错问题。

## 问题原因
- assetLeaseApply/detail.vue 中「前往开户」「签署协议」辅助链接使用 getRouterPathByFilePath 解析路由
- 当前账号无「监管账户开户」或「监管协议签署」菜单权限时，该函数直接弹出错误提示
- 两个链接各调用一次，出现两条相同错误「没有授权相关菜单，请联系管理员」

## 修复内容
- 参照 pubUseMoneyApply/detail.vue 写法，改用 getRouterPathByFilePathOptional
- 有权限正常显示辅助链接；无权限静默跳过，弹窗仍可正常选择物业管理区域
- 项目中 pubBankReceiptApply、pubExpenditureContract 等多个页面存在同样写法，可批量修复

## 验证与归属
- 涉及文件：src/views/benefit/assetLeaseApply/detail.vue、src/views/benefit/pubUseMoneyApply/detail.vue、src/utils/ruoyi.js
- 所属项目：园区公共收益；来源会话：82837732-6269-4a38-bb56-614e39f5bbeb

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "assetlease_router_fix",
  "source_extraction_id": "097cc9e742094ebe90d460565fc77958",
  "version": 1,
  "memory_type": "entities"
}
-->