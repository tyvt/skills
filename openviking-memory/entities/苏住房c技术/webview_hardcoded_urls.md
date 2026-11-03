# 苏住房C第三方web-view地址清单
苏住房C小程序(zhi2-mobile-shimin)的便民政策/工具类页面通过3个承载页硬编码跳转8个第三方URL，新增同类页须复用既有地址。

## 承载页
- pages_main/common/webView.vue（通用容器）
- pages_main/common/webViewNav.vue（带导航栏偏移）
- pages_transaction/thirdMap/index.vue（直接内嵌web-view）

## 硬编码地址
- cc.szfcweb.cn:9999/pages/policy/* 下7个：zzsscs住宅税收测算、fzzsscc非住宅税收测算、zjcj中介成交流程、zxcj自行成交流程、contractPDF买卖合同范本、xieyiPDF资金托管协议、verifyHouse/errorTip常见问题
- szdt.xzspj.suzhou.gov.cn:18087/#/housebuilder?hallType=2&qttype=252_5 行政审批局楼盘地图

## 动态下发地址
- 资讯/公示详情的detail.urlSite（importType==2时整页跳转）
- 富文本里的<a href>外链（article/ListDetail、announcement/detail、publicNotice、owner/company/service的ListDetail）统一由web-view承载页接管

## 使用规则
- 凡是「点进去看政策说明/测算工具/第三方地图」需求，先找现有URL用webView/webViewNav带title跳转，不在业务页重写地址或自造H5
- 新增第三方地址时把常量集中登记并注明入口文件，避免散落各业务页
- 验证：会话c5d58c85梳理得出3承载页+8硬编码地址+动态下发清单；所属项目苏住房C；代码基线9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "webview_hardcoded_urls",
  "source_extraction_id": "78365181dbcb4a00b458a6e0aa385005",
  "version": 1,
  "memory_type": "entities"
}
-->