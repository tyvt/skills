# house_data.js 删数据后 id 需重排连续
苏找房WEB 的 public/assets/js/house_data.js 删除数据后需将 id 重排为连续数值。

## 问题根因
- 删除数据导致 public/assets/js/house_data.js 的 id 断档（原 49 至 51 跳号）
- id 不连续会影响依赖顺序或索引的逻辑

## 修复方案
- 按现有数据顺序将 id 重排为连续 1 至 73
- 删除数据后须同步重排 id 保持连续

## 验证与归属
- 涉及文件：public/assets/js/house_data.js
- 来源会话：0bddbff5-d91b-45c4-99d9-ac1a45133ee6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_id_resort",
  "source_extraction_id": "f667ae03057146ae8933dff0fd05df44",
  "version": 1,
  "memory_type": "entities"
}
-->