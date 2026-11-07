# 监管协议终止列表接口去/add后缀
苏州市房地产监测V3 中 zhi2-web-admin/src/api/zjjg/xymx.js 的 listXyEnd URL 去除多余 /add 后缀，与 benefit/xymx.js 保持一致。

## 问题根因
- zhi2-web-admin/src/api/zjjg/xymx.js 中 listXyEnd 的 URL 误拼多余 /add 后缀，致监管协议终止详情页「监管范围」表格加载异常

## 解决方案
- 去除 listXyEnd 的 URL 多余 /add 后缀，与 benefit/xymx.js 保持一致
- 监管协议终止详情页「监管范围」表格由此正常加载

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/010.md
- 涉及文件：zhi2-web-admin/src/api/zjjg/xymx.js、benefit/xymx.js、supervision/agreement/end/detail.vue、supervision/agreement/xy/components/AgreementDetailsTable.vue、mixins/listMixins.js、路由信息.json
- 所属项目：苏州市房地产监测V3；来源会话：d33916e8-66d0-4dad-b5a9-9efd7da908c8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xymx_api_fix",
  "source_extraction_id": "a8c29ad78aa04768882548eb829f2e94",
  "version": 1,
  "memory_type": "entities"
}
-->