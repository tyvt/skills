- 偏好在苏住房C小程序按合同/权证添加房屋时，若核验接口返回非200，不触发全局一闪而过的 toast，而由页面展示「核验失败」弹窗，提供「人工登记」与「重试」。
- 偏好未查到房屋或未关联小区时，继续用成功类弹窗引导「人工登记」，按钮文案统一为「人工登记」而非「手动维护」。
- 偏好新增`verifyHouseOwner`（noReject:true）由页面自行处理失败逻辑，替代原`handleHouseOwner`全局 reject 行为。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房C房屋核验失败处理",
  "source_extraction_id": "8ed8cc7c612c4cff9097a608de758469",
  "version": 1,
  "memory_type": "preferences"
}
-->