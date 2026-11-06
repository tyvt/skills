# 缴款网点弹窗接口与字段对齐修复
修复苏州市房地产监测V3中缴款网点弹窗缺少 /prefund/bankBranch/page 接口及字段不匹配问题。
## 新增API
- yhwdgl.js 新增 pageBankBranch，调用 POST /prefund/bankBranch/page
## 修复弹窗
- PaymentOutletDialog.vue 的 getList() 改为调用 pageBankBranch，传入 workBankId、isStart 等参数
- 表格字段：unionBankName→bankBranchName、address→bankBranchAddress、row-key→bankBranchManageId
- 清理 listYhwdgl/listYhlhhgl/listBuild 等无用导入及残留 submitForm、getjumpchaanz 逻辑
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：yhwdgl.js、PaymentOutletDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：eab9bc90-2387-4c8e-a6b6-383aca8454a6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_outlet_fix",
  "source_extraction_id": "212c18051ff547cab1b52f1f1e9fd4df",
  "version": 1,
  "memory_type": "entities"
}
-->