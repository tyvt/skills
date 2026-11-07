# 房贷导引银行点击跳转修复
苏住房C小程序「房贷导引」页面点击银行跳转本地未注册页面报错已修复。

## 问题原因
- houseLoanGuide/index.vue点击银行时跳转本地页面/pages/policy/fddydetail?id=${item.bankLogo}
- 小程序pages.json未注册该页面，报navigateTo:fail page not found

## 修复内容
- 与「税收导引」「交易流程导引」等页面保持一致，改为通过webViewNav打开外部H5页面
- 跳转地址：https://cc.szfcweb.cn:9999/pages/poli...（外部H5），并携带事件埋点与银行名称标题

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_transaction/houseLoanGuide/index.vue、src/pages.json、src/api/transaction.js
- 所属项目：苏住房C；来源会话ID：2d03bb3e-84c4-4246-ae8a-bea874fd391d；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "loan_nav_fix",
  "source_extraction_id": "024075fb80c64e0a8d2ee5d6485b7b39",
  "version": 1,
  "memory_type": "entities"
}
-->