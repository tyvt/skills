# 房贷导引电话号码点击拨打功能
苏住房C 房贷导引各银行详情页联系方式已支持点击唤起拨号，并新建本地详情页替代原外部 webView。

## 修复要点
- `src/utils/sfb.js` 新增 `callPhone` 与 `extractPhoneNumber`：苏服办 H5 优先 `lightAppJssdk.device.call`，其他环境降级 `uni.makePhoneCall`
- `src/pages/about/AboutUs.vue` 客服电话改为可点击并以主题色高亮
- `src/pages/policy/fddydetail.vue` 新建本地详情页替代外部 `cc.szfcweb.cn` webView，联系方式电话号码可点击拨打
- `houseLoanGuide/index.vue` 银行详情跳转改为本地页 `/pages/policy/fddydetail?id=${bankLogo}`
- `PhoneCall` 组件同步改用 `callPhone`，苏服办中正确唤起拨打

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：fffe887a-3e61-4531-8ddb-6bd2cac507c9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "mortgage_guide_call",
  "source_extraction_id": "ac50ecf9f90845419e67ae4bb989c614",
  "version": 1,
  "memory_type": "entities"
}
-->