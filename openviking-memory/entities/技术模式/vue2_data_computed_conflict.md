# Vue2中data与computed同名属性致告警
subTableMixins 的 table.js 在 data 声明 operationColumnWidth，本组件 computed 同名，Vue2 禁止该行为致警告。

## 问题根因
- subTableMixins 的 table.js 于 data 声明 operationColumnWidth
- 本组件 computed 声明同名属性，Vue2 禁止 data 与 computed 同名致警告

## 解决方案
- 计算属性改名为 applyOperateColumnWidth 并绑定模板 :width
- bizState === '0' 时宽 160 否则 100

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：table.js
- 验证证据：src=2-0/022.md
- 来源会话ID：751fbf61-9cad-490e-9eb7-c4aa5a8ffe55
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue2_data_computed_conflict",
  "source_extraction_id": "90385991b34a4bfc9228b2efe8b61831",
  "version": 1,
  "memory_type": "entities"
}
-->