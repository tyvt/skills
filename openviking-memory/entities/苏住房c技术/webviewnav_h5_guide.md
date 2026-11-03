# 苏住房C政策导引类详情走webViewNav+H5
苏住房C小程序政策/导引类详情一律走 webViewNav + H5，本地 pages.json 没有对应页面，遇 navigateTo page not found 先确认是否注册。

## 问题现象
- houseLoanGuide 点银行跳 `/pages/policy/fddydetail?id=xx` 控制台报 navigateTo:fail page not found
- 该页面在 src/pages.json 未注册，属于从其他端复制残留的本地路由

## 根因
- 本项目政策/导引类内容全部由 H5 站点 cc.szfcweb.cn:9999 承载，无本地对应页

## 解决方案
- 与「税收导引」「交易流程导引」一致，改为 goto(`/pages_main/common/webViewNav?url=${encodeURIComponent(H5完整地址)}&title=${encodeURIComponent(title)}`)
- title 用 getDictLabel(item.bankLogo, appStore.getDict('BANK_LOGO_H5')) 取字典中文
- 新增导引类需求直接按 H5 + webViewNav 实现，不要在分包里新建同名本地页
- 遇 navigateTo page not found，先 grep pages.json 确认目标路径是否注册，再看同目录兄弟页是否走 webViewNav
- H5 打不开时不要再改前端，先验 https://cc.szfcweb.cn:9999 服务可用性

## 验证与归属
- 验证会话 2d03bb3e（基线 4630e8e）：houseLoanGuide 改为 webViewNav 打开 H5 并带字典标题，重编译通过
- 涉及文件：pages_transaction/houseLoanGuide/index.vue、pages.json、pages_main/common/webViewNav.vue、api/transaction.js
- 所属项目：苏住房C；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "webviewnav_h5_guide",
  "source_extraction_id": "ceeab5991c4441bf91972f5b0aa75c6e",
  "version": 1,
  "memory_type": "entities"
}
-->