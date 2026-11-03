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
- 验证：会话f5c3361f用户报切换房屋A→B返回变回A；定位submit.vue的onShow→getHouseList按默认重置；修复为data.house有值时按选中项回填5个字段并return
- 涉及文件：src/pages_owner_extra/repair/submit.vue、chooseFacility.vue、src/pages_owner/repair/submit.vue、chooseFacility.vue
- 所属项目：苏住房C；来源会话ID：f5c3361f-ac2a-43fa-8586-7a2d7934e203；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "repair_onshow_reset",
  "source_extraction_id": "3ba05a2df0ba496eb9f6fc33290d5132",
  "version": 1,
  "memory_type": "entities"
}
-->