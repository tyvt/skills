# 支付状态 paidState 字典对齐修复
支付状态 paidState 的入参与展示已统一对齐字典 sp_pay_status，并修正了原先枚举值写反的问题。

## 字典定义
- 值 0：待支付
- 值 1：部分支付
- 值 2：已支付

## 枚举与常量修复
- enums.js 新增常量 SP_PAY_STATUS_DICT = 'sp_pay_status'
- 修正 PAY_STATUS_TAB：PARTIAL: '1'、PAID: '2'（原先写反）
- 导入预览列 paidState 增加 dictUrl

## 页面改造
- index.vue 列表 Tab 顺序：全部 → 待支付 → 部分支付 → 已支付
- 列表列与 detail.vue 详情均使用 dictUrl: sp_pay_status 展示
- import.vue 导入预览加载 sp_pay_status 字典，显示标签而非原始值
- 「收款」按钮在 paidState != '2'（非已支付）时显示

## 验证与归属
- 所属项目：产品2.0
- 来源会话ID：80a1a5aa-28bf-448e-ab1d-e5b881e76943
- 涉及文件：enums.js、index.vue、detail.vue、import.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "paidstate_dict_fix",
  "source_extraction_id": "00a25f2a044543009563b95e37f53c30",
  "version": 1,
  "memory_type": "entities"
}
-->