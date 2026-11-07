# switch_handler_missing
园区物管2.0 Vue2 列表页 el-switch 绑 @change 但 methods 未声明 handler 导致功能静默失效的修复模式。

## 问题根因
- 模板里 el-switch 常用 @change="changeType" 切换「树状/平铺」并控制左侧树面板 v-show
- 从别的页面复制模板却未带上 methods.changeType，运行时只有 [Vue warn] Property or method "changeType" is not defined，功能静默失效

## 解决方案
- 对齐同业务域已上线页（如 pubHouse/index.vue、assetsLeaseContractFiling）补齐 changeType
- 批量检查 resourcesLeaseContractFiling、parkingSpaceContractFiling 等同类备案列表是否缺同一方法

## 验证与归属
- 验证：会话 c5b92557 中 resourcesLeaseContractFiling/index.vue 第 9 行 @change="changeType" 无 methods 定义；按 pubHouse 等同构页补全后警告消失
- 涉及文件：resourcesLeaseContractFiling/index.vue、pubHouse/index.vue、assetsLeaseContractFiling/index.vue；所属项目：园区物管2.0；代码基线：5a288f142

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "switch_handler_missing",
  "source_extraction_id": "a1f1b35f47af4915ad79cae6583607ea",
  "version": 1,
  "memory_type": "entities"
}
-->