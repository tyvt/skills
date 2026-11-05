# 交易合同PDF预览修复
苏住房C小程序中合同示范文本通过web-view打开H5 PDF导致空白，已改为直接调用原生PDF预览。

## 问题根因
- contractDemo/index 原通过 webViewNav 打开 `policy/contractPDF` 与 `policy/xieyiPDF` 两个 uni-app H5 路由，内部用 vue3-pdf-embed 渲染。
- 小程序 web-view 中 PDF 嵌入组件常无法正常显示，导致空白页。
- 实际 PDF 地址：买卖合同 `/assets/存量房合同2016-eb78d388.pdf`、托管协议 `/assets/托管协议2023-8f3554ec.pdf`。

## 修复方案
- 改为直接打开 PDF 文件，走已有 `pages_main/common/pdf` 页面。
- 通过 `openPdfByUrl` 下载并用微信原生文档预览打开。

## 验证与归属
- 验证：进入「合同示范文本」，分别点击买卖合同与托管协议，应正常弹出 PDF 预览。
- 涉及文件：pages_transaction/contractDemo/index.vue、pages.json、pages_transaction、pages/common/webViewNav.vue。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：020e9c50-2c1d-44df-92a0-ef6ed7aed251。

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "contract_pdf_webview",
  "source_extraction_id": "642a3b3d95c0467b8362de733a2cb85a",
  "version": 1,
  "memory_type": "entities"
}
-->