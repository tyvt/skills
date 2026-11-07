# 监管协议终止列表接口URL多拼后缀
zhi2-web-admin 的 xymx.js 中 listXyEnd 的 URL 多拼 /add 导致请求路径错误，修正为与 benefit/xymx.js 一致的路径后监管范围表格正常加载。

## 问题根因
- zhi2-web-admin/src/api/zjjg/xymx.js 中 listXyEnd 的 URL 多拼 /add 导致请求路径错误

## 解决方案
- 修正为 /prefund/superviseAgreeDetail/listByAgreeNo 与 benefit/xymx.js 一致
- 监管协议终止详情页监管范围表格正常加载

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/210.md
- 涉及文件：路由信息.json、supervision/agreement/end/detail.vue、AgreementDetailsTable.vue、api/zjjg/xymx.js、mixins/listMixins.js、api/benefit/xymx.js
- 所属项目：苏州市房地产监测V3；来源会话：d33916e8-66d0-4dad-b5a9-9efd7da908c8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "xymx_list_url_suffix",
  "source_extraction_id": "8d76582b52e848ada33f841ccd2a4531",
  "version": 1,
  "memory_type": "entities"
}
-->