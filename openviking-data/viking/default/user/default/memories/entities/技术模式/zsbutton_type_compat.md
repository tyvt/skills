# ZsButton type=cancel 兼容映射
Element Plus 的 ElButton 不支持 type="cancel"，ZsButton 原样透传会触发 Vue warn，需在封装层映射。
## 问题根因
- Element Plus ElButton 不支持 type="cancel"，直写会触发 Vue warn。
- ZsButton 原样透传该类型至 ElButton 触发告警。
## 解决方案
- 在 src/components/zs-button/zs-button.vue 内做兼容映射，遇 type="cancel" 转 type="default"。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：0f7a61e1-c656-416f-950e-b97496882719
- 验证证据：会话 0f7a61e1-c656-416f-950e-b97496882719 报 ZsBtn 未映射 cancel 致 ElBtn 告警。
- 涉及文件：src/components/zs-button/zs-button.vue；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbutton_type_compat",
  "source_extraction_id": "e2f835fecd3341d79c672dd1cc9b7a31",
  "version": 1,
  "memory_type": "entities"
}
-->