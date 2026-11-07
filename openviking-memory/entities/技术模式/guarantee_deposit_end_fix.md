# 房屋质量保证金协议终止页修复
产品2.0 项目修复房屋质量保证金协议终止（add 模式）页面数据未加载与路由错误问题。

## 修改文件
- guaranteeDepositAgreementEnd/index.vue（终止页 detail.vue）
- guaranteeDepositAgreement/index.vue（协议详情页）

## 问题根因
- add 模式下 detailMixins 不会调用 init()，虽写了 loadAgreementById 但从未执行，页面字段为空
- 跳转用 detail 路由拼接 add，可能生成错误路径（如 ...Endadd），触发错误详情接口请求，报「请求参数格式错误或类型不匹配」

## 主要改动
- 终止页 detail.vue：在 created 中根据 agreementId 自动加载协议数据，并清除 sessionStorage 缓存避免覆盖
- 协议详情页：跳转改为使用列表路由 guaranteeDepositAgreementEnd/index + /add，确保路径正确
- 展示优化：从协议详情带过来的数据（物业管理区域、开发企业、物业服务企业、建设单位及协议信息）以只读方式展示，不再显示「点击选择协议」

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：从协议详情页点击「终止」应自动带出相关信息，只需填写终止原因和附件
- 所属项目：产品2.0；来源会话：c2c05a52-f049-49d4-a534-d9c5df814673；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_end_fix",
  "source_extraction_id": "d29ececa168b4f758ad876f7efb26ee0",
  "version": 1,
  "memory_type": "entities"
}
-->