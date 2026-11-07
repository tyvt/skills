# 报修提交页onShow重载覆盖已选房屋
苏住房C市民端报修提交页在onShow中无条件重载房屋列表，导致从子页返回时用户手动选择的房屋被默认逻辑重置，报修挂错房屋。

## 问题现象与根因
- 报修提交页表单「所在房屋」从A切到B，点「报修设施设备」进入选择页，返回后房屋变回A，后续报修挂到错误房子
- submit.vue的onShow每次调getHouseList()重新拉列表，按优先级自动纠正选中项（userStore.houseId全局默认→当前小区房屋→列表第一项）
- 从子页面返回触发onShow，手动选择被默认逻辑覆盖；此类「onShow重载数据+表单默认值推导」组合必现且不明显报错

## 解决方案
- getHouseList内先判断form.house是否已有值：有则在刷新后列表找到对应项，补齐complexId/complexName/userIdentityId/houseId/position等联动字段后return，跳过默认房屋逻辑
- 仅用户未选过时才走默认优先级
- 同类排查：任何onShow/onActivated调用带默认值推导的加载函数都要检查是否覆盖已填内容，从选择类子页返回是最高发触发路径

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- Verification: session f5c3361f user reported house A->B reset to A on return; located submit.vue onShow->getHouseList default reset; fixed by returning 5 fields when data.house has value
- Verification evidence: src=苏住房C/062.md
- Involved files: src/pages_owner_extra/repair/submit.vue, chooseFacility.vue, src/pages_owner/repair/submit.vue, chooseFacility.vue, src/pages_owner/repair/add.vue, src/pages_owner_extra/repair/index.vue, src/pages.json
- 所属项目：苏住房C；来源会话ID：f5c3361f-ac2a-43fa-8586-7a2d7934e203；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "repair_onshow_reset",
  "source_extraction_id": "0424bc6fcd5a49b3a343fdf938f08ef6",
  "version": 2,
  "memory_type": "entities"
}
-->