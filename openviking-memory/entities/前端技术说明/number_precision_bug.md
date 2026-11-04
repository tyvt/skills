# store.flood.ts 中 Snowflake Long 精度丢失（Number() 崩溃）
在 Su 住房保障防汛 C 端的 store.flood.ts 中，使用 Number() 转换 19 位的 Snowflake Long ID（eventId/templateItemId）会丢失最后几位数字，导致后端 400 错误和“重复项目”的虚假症状。

## 问题根因
- submitInspectionRemote/submitRescueRemote 在第 176、177、180、183 行对 19 位 Snowflake Long 使用了 Number()。
- 超出了 JS 的安全整数 2^53，导致最后一位数字失真，使得后端报 400 “通知不存在”。
- 两个不同的 templateItemIds 塌缩为同一个值，在 e2e 中显示为重复项目。

## 修复
- store 侧（由组长修复，不在助手编写范围内）：eventId/complexId/templateItemId 使用 String()，发送 id 使用 String(saved)，移除了所有 Number()。
- 页面侧（由助手修复）：巡检发送 payload 的 buildRemoteValues() 现在以模板项作为唯一来源并按 templateItemId 去重；eventId/complexId 也作为额外保护以 String 形式传递。

## 验证
- 组长通过反向代理测试了事件 1186：保存和发送均返回 code=200 且正确回显详情。
- typecheck EXIT=0, build:h5 EXIT=0, test 20/20 全部绿色；task-1 标记为已完成。
- 相关文件：store.flood.ts (submitInspectionRemote/submitRescueRemote)；Su 住房保障防汛 C 端巡检页面。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "number_precision_bug",
  "source_extraction_ids": [
    "35c86686df24402eb79d2df0dde905b0",
    "a7d4b155515447d4b59be6579654e5d2"
  ],
  "version": 1,
  "memory_type": "entities"
}
-->