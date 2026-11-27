---
audit_status: invalid
last_checked: 2026-11-27T23:19:02+08:00
verdict_note: 归属 project=0 为占位垃圾；iHome小程序 pages-rent/subsidy.vue 实为概览页+rentApplyTip 提示弹窗，'某某科技'预填、'所属单位'校验、showToast 申请成功全 MISS，描述与现状不符，属幻觉/测试垃圾。
---
# rent补贴页在线申请接入底部mock表单
原在线申请跳转外部无法走通 mock，于 src/pages-rent/subsidy.vue 改为底部弹窗表单。

## 实现要点
- 底部弹窗表单预填苏州工业园区某某科技等示例
- 校验所属单位等三项必填字段
- 校验通过则 uni.showToast 提示申请成功，不跳外链

## 验证与归属
- 所属项目：0
- 验证证据：extracted source=cursor project=0
- 涉及文件：src/pages-rent/subsidy.vue
- 来源会话：0b6c14cb-8ef7-4458-9e20-74433b5f44f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_subsidy_form",
  "source_extraction_id": "9a29e76e1db34dbc832f5a873f6c0d40",
  "version": 1,
  "memory_type": "entities"
}
-->