# 报表导出401全局拦截解法
在全局 window.open 拦截器的 needAccessToken 匹配表中增加 ZS_UReport/download，一处覆盖所有报表导出鉴权，避免逐个修改报表文件。

## 问题背景
- 多个报表页通过 window.open("ZS_UReport/download/" + url) 裸链接导出 Excel，后端返回 401，需带 access_token
- 各报表文件散落裸链接，逐个改下载函数易漏，每加报表就要改一次

## 解决方案
- 在全局 window.open 拦截器维护 needAccessToken URL 匹配表，本批新增 ZS_UReport/download 匹配
- 拦截器命中后自动追加 ?access_token=，值取 sessionStorage.token（父页面登录后写入）
- 现有报表页 window.open("ZS_UReport/download/" + url) 自动带 token，无需改 dowloadFile
- 新增同类下载接口只在 needAccessToken 加一条匹配规则，不在业务页面散落拼 token

## 验证与归属
- 验证：登录后打开「交易明细查询(按监管协议)」导出 Excel，新窗口地址带 access_token 且正常下载 xlsx；仍 401 先确认父页面已写 token 到 sessionStorage 再查匹配串
- 涉及文件：src/commonData/tools.js
- 来源会话：850d85da-5642-43cf-8538-b21be1047a2a；代码基线：dc211bd7（develop/v1.0.0）
- 用户诉求：禅道任务 2125 改前端并提交推送代码、修改禅道状态

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report_401_intercept",
  "source_extraction_id": "9c0e6f113ab94ec3bf48ce74c44050b9",
  "version": 1,
  "memory_type": "entities"
}
-->