# 页面自己弹业务弹窗时核验接口须带 noReject
苏住房C 小程序添加房屋核验失败时，因全局拦截器抢先弹 toast 并 reject，页面自定义「人工登记」弹窗不可达。

## 问题根因
- 全局 HTTP 拦截器对 code!=200 响应统一 showToast 并 reject，页面 .then 里 showPopup=true 永远执行不到。
- 页面未写 .catch，连错误分支都进不去，用户只看到底部 toast 一闪而过。
- 与「noReject 返回结构解析」不同层：此处是拦截器抢先处理导致 UI 分支不可达。

## 解决方案
- 凡「失败也要走页面自定义 UI」的接口，api 层默认带 noReject:true（如 handleHouseOwner），页面拿 normalized 响应自己判 code。
- 所有调用方补 code 判断与 .catch() 兜底，不能假设 then 只收成功。
- 业务弹窗组件（ZsPopup）移到页面根级、补 z-index，用 immediate watch + nextTick 打开兼容 H5/政务容器。
- 新增同类核验接口先问「失败要不要弹窗」，要就默认 noReject。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 0e3de74d（2026-09-28，基线 2c4e3d9）用户报「我的房屋-添加房屋，人工登记弹窗入口不显示」，根因结论如上。
- 涉及文件：zhi2-mobile-shimin/src/api/httpInstance.js、src/api/property.js、src/pages_owner/house/owner/addHouseContract.vue、addHouse.vue、src/components/ZsPopup/ZsPopup.vue。
- 所属项目：苏住房C；来源会话ID：0e3de74d-cc4d-4e34-8770-dd23e2757471；代码基线：2c4e3d9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "biz_popup_noreject",
  "source_extraction_id": "f05b6458c8ca40feaba9dc1759c1ed7d",
  "version": 1,
  "memory_type": "entities"
}
-->