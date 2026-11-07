# 前端下线字段但后端仍必填
前端删除表单字段（如 fundsUsage）但后端仍必填，undefined 字段被 JSON.stringify 省略，导致保存报「字段未传」。

## 问题现象
- 产品需求要求前端去掉用款申请「资金用途」fundsUsage 输入框、校验和展示，但编辑保存报「fundsUsage 字段未传 / 资金用途名称不能为空」
- form 里 fundsUsage 为 undefined 时 JSON.stringify 整体省略该键，后端收到「字段未传」而非「传了空值」，报错更具迷惑性
- 选明细回填时只设置 useMoneyApplyName 等展示字段，未给 fundsUsage 赋值，两个语义独立但后端都要求

## 根因
- 代码问题不是数据问题：前端删了 UI 但后端仍必填，且前端未适配映射
- 涉及文件：src/views/benefit/pubUseMoneyApply/detail.vue、src/views/property/useMoneyApply/detail.vue

## 解决方案
- 判定口诀：「UI 删字段 ≠ 后端不再要求」，先确认后端校验是否同步调整（本仓库无后端源码，需推动后端或前端适配）
- 纯前端方案：提交前在 payload 里自动映射 fundsUsage = useMoneyApplyName || businessSubItemName，或在选明细的 setBusinessSubItem 回调里同步赋值
- 后端方案：将字段改非必填或废弃校验
- 通用原则：下线表单字段时要过一遍「提交载荷里这个字段后端还要不要、从哪来」，否则保存链路在用户看不到的地方断掉

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 0ec35fee（050.md）pubUseMoneyApply/detail 结论：vue 的 setBusinessSubItem 缺 fundsUsage 赋值、form 里 undefined 提交被序列化省略，后端仍必填
- 涉及文件：src/views/benefit/pubUseMoneyApply/detail.vue；src/views/property/useMoneyApply/detail.vue
- 所属项目：产品2.0；来源会话ID：0ec35fee-2fec-4d29-8269-642ebfd5c257；代码基线：产品2.0 zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "fundsusage_required_omitted",
  "source_extraction_id": "b2b84215894c4ce686e5d8228693700e",
  "version": 1,
  "memory_type": "entities"
}
-->