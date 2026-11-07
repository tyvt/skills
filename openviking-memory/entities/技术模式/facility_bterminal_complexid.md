# 公共设施设备维护B端区域缺失修复
园区公共收益项目B端物业管理区域选择框隐藏后complexId未绑定当前项目，导致新增校验失败，已修复。

## 问题根因
- B端（物业公司账号）隐藏左侧「物业管理区域」选择框
- complexId未从顶部导航栏已选小区（currentProjectId）自动绑定
- 点击「新增」时校验失败

## 解决方案
- 新增resolveComplexFromProject()，从$store.getters.currentProjectId和currentProjectName自动填充complexId/complexName
- 在init、getQueryParams、getList、handleAdd、handleNodeClick、activated中调用该方法
- B端提示文案优化：黄色提示「请先在顶部选择物业管理区域，并在左侧选择公共设施设备分类」，校验失败提示「请先在顶部选择物业管理区域」；G端文案不变

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：需用物业公司B端账号测试
- 涉及文件：zhi2-web-admin/src/views/maintenance/facility/index.vue、facilityChange/index.vue、src/store/modules/user.js
- 所属项目：园区公共收益；来源会话：2e2052e0-5af7-4539-ad66-24c40bd630fb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "facility_bterminal_complexid",
  "source_extraction_id": "e1adb89c6aad4357a6a61f939a5b1749",
  "version": 2,
  "memory_type": "entities"
}
-->