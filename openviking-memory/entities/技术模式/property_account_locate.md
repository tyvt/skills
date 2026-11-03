# 近名页面改错位置按请求名定位
苏住房G项目同业务存在 property/account 与 property/propertyAccount 两个近名页面，参数须改真正发请求的那个页面。

## 问题根因
- 需求「开户银行弹窗新增参数 isPubRegulatoryAccount=1」先在 property/account/detail.vue 改完，验收截图反馈「没加上，加错位置」
- 截图请求 queryStartBank 来自 property/propertyAccount/detail.vue 的 showBankDialog()，走 /system/workBank/list 与银行网点接口
- account 目录页面走另一套接口；两目录名只差 property 前缀、都叫「账户」，靠目录名/标题无法区分

## 解决方案
- 搜索以请求名 queryStartBank / selectTJgBankBranchList 而非中文为入口，反查调用它的 detail.vue
- showBankDialog() 中 treeParams 与 filterParams 两参数对象须同步改，否则「树有值、网点列表没有」
- setBankBranches() 的 filterParams 是第三个独立入口，必须同步
- 模式参数用 computed（add/openedAdd 返回 {isPubRegulatoryAccount:'1'}、edit 返回 {}），Network 核对 add 与 edit
- 验证话术：明确告知「编辑模式下该参数不应出现」，否则被当成漏改

## 验证与归属
- 修复后 queryStartBank 带 isPubRegulatoryAccount=1&isStart=1&sourceModel=property，selectTJgBankBranchList 带该参数，编辑模式不带
- 涉及文件：property/propertyAccount/detail.vue、property/account/detail.vue、property/account/components/AccountDialog.vue、utils/workBank.js
- 所属项目：苏住房G；来源会话：4cfcd91c-2679-4f6f-b33f-ee016bf89b9f；代码基线：a700def

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_account_locate",
  "source_extraction_id": "dab230741e8b4b79a6560976b4006de8",
  "version": 1,
  "memory_type": "entities"
}
-->