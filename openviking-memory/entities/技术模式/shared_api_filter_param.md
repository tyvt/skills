# 共用接口过滤参数仅页面级注入
苏住房G 同一接口被多页面共用时，专属过滤参数只在调用点加，不在 utils/api 层统一注入，避免影响其他页面。
## 问题背景
- 承办银行接口 /system/workBank/queryStartBank 与 /system/sysBankBranch/selectTJgBankBranchList 被开户申请、账号管理、阳光物业等多页共用。
- 开户申请页需按公示监管账户口径过滤（isPubRegulatoryAccount='1'），改全局会误过滤其他页面。
## 解决方案
- 只在该页面取数方法（如 showBankDialog）构造专属参数对象，分别并入树接口 treeParams 与网点接口 filterParams，两处都要传。
- 同类需求先 grep 接口名确认全部消费方，再决定页面级传参或收归公共层；页面级改动要点明「仅本页传，不影响其他使用同一接口的页面」。
## 验证与归属
- 验证：会话 2efbcda9 用户诉求「多处使用同一个接口导致其他不该过滤的数据也过滤了，isPubRegulatoryAccount 传个1就行」；最终仅改 pubRegulatoryAccount/detail.vue 的 showBankDialog，两接口各补参数，不影响其他页。
- 涉及文件：benefit/pubRegulatoryAccount/detail.vue、utils/workBank.js、benefit/pubRegAccChange/detail.vue、benefit/pubRegAccPropMgmt/detail.vue、property/propertyAccount/detail.vue；所属项目：苏住房G；代码基线：864b409；来源会话ID：2efbcda9-5d9e-4e10-b220-37bd1e4d05e9。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shared_api_filter_param",
  "source_extraction_id": "f784251e7b6a453dbf14488ca4fe0ff8",
  "version": 1,
  "memory_type": "entities"
}
-->