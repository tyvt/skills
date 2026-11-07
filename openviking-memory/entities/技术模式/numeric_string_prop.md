# v-bind数字传入String类型prop致警告
solicitation/index.vue 使用 :isCacheData="1" 传入数字，而组件 prop 声明 type: String，类型不匹配触发告警。

## 问题根因
- solicitation/index.vue 使用 :isCacheData="1" 传入数字
- MaintenanceItemDialog 等组件 prop isCacheData 声明 type: String
- 类型不匹配触发告警

## 解决方案
- 改为静态属性 is-cache-data="1" 以字符串传入消除警告

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：solicitation/index.vue
- 验证证据：src=2-0/022.md
- 来源会话ID：1a65bc78-1633-4575-9038-ce79d3aab801
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "numeric_string_prop",
  "source_extraction_id": "90385991b34a4bfc9228b2efe8b61831",
  "version": 1,
  "memory_type": "entities"
}
-->