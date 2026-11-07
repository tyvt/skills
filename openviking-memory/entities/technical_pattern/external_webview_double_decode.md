# 外跳投票页h5ExternalWebview二次解码破坏Base64 token
业主决策等外跳投票页URL的query中token、certificateNum等为Base64形态，经h5ExternalWebview进入后鉴权失败。

## 问题根因
- 路由或中间层已对query做过一次解码
- 页面再对整个URL做decodeURIComponent会把仍带百分号编码的片段二次解码成+、/、=
- 二次解码破坏密文参数（%2B/%2F/%3D变成+、/、=）

## 验证与定位
- 会话9b0c382d：定位h5ExternalWebview对URL做了二次decodeURIComponent导致token参数损坏
- 示例URL含token=…%3D，修复方向为storage传递并修正解码逻辑

## 解决方案
- 长URL或含敏感query的外跳优先用uni.setStorageSync传完整URL，目标页只读storage不再二次decode
- 若必须走query，只解码一次且避免对已解码token子串再decode
- 用带%3D的真实投票链接做联调验收

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages/common/webView.vue、src/hooks/useUrlQueryParam.js、src/pages.json
- 所属项目：无锡市区小程序嵌入H5；来源会话：9b0c382d-6f57-4324-ab6b-ebafaf8e1362；代码基线：3fb9434

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "external_webview_double_decode",
  "source_extraction_id": "2ecfaf2eb90d45a1a96af78198fcde16",
  "version": 1,
  "memory_type": "entities"
}
-->