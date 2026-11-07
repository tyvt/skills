# Element Plus 按钮 size 不支持 mini 的兼容映射
ElButton size 仅支持 ""|default|small|large，历史 size="mini"/medium 会告警，需在 ZsButton 封装层做映射。
## 问题根因
- Element Plus ElButton size 不支持 mini/medium，直写会触发 Invalid prop 警告。
## 解决方案
- 在 zs-button.vue 封装层映射 mini→small、medium→default。
- 直写 `<el-button size="mini">` 的页面改为 small（如 pubFinanceAccountSet、facilityDefinition）。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 00e00f2e 报 Invalid prop got value "mini"，经 ZsButton 兼容与残留 el-button 改写修复。
- 涉及文件：zhi2-web-admin/src/components/zs-button/zs-button.vue、zhi2-web-admin/src/views/benefit/pubFinanceAccountSet/index.vue、zhi2-web-admin/src/views/maintenance/facilityDefinition/index.vue；所属项目：2-0；来源会话ID：00e00f2e-7bd0-4fda-907d-b7a04062a73c；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_size_compat",
  "source_extraction_id": "187fbfd8a3244360aafe88fc224b6d1b",
  "version": 1,
  "memory_type": "entities"
}
-->