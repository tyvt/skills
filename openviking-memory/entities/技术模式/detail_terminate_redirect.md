# 详情页终止按钮跳转带数据新建页
房屋质量保证金协议终止入口从列表页移到详情页，点终止打开新建页并自动带出源协议数据，需避开 detailMixins add 模式不取数与路由拼错两个坑。
## 问题现象
- 终止新建页字段全空，因走 add 模式时 detailMixins 不调 init()，页面里 loadAgreementById 从未执行
- 跳转把 detail 路由直接拼 add 生成 ...Endadd 错误路径，触发详情接口报「请求参数格式错误或类型不匹配」
## 根因
- detailMixins 取数只挂在 view/edit 模式，add 模式要带数据必须自己显式加载
- 路由拼接须用列表路由 + /add 约定路径，不能拿详情路由当基底
## 解决方案
- 终止列表页去掉「新增」按钮；协议详情页终止按钮跳到 guaranteeDepositAgreementEnd/index + /add 并带 agreementId
- 终止新建页在 created 中按 agreementId 主动加载源协议数据，并清掉 sessionStorage 旧缓存防止覆盖
- 从协议带过来的区域/企业等字段以只读方式展示，不显示「点击选择协议」
## 验证与归属
- 涉及文件：guaranteeDepositAgreementEnd/index.vue、guaranteeDepositAgreementEnd/detail.vue、guaranteeDepositAgreement/index.vue、propertyAgreement/detail.vue
- 所属项目：产品2.0；代码基线：414029f
- 来源会话ID：c2c05a52-f049-49d4-a534-d9c5df814673

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_terminate_redirect",
  "source_extraction_id": "5a1f60793990469a86c8c5a93e7974f0",
  "version": 1,
  "memory_type": "entities"
}
-->