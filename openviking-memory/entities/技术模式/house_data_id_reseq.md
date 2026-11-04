# 苏找房WEB house_data.js 的 id 重排
已按数据顺序把 `public/assets/js/house_data.js` 的 `id` 全部重排为连续 1–73，修复跳号。

## 操作详情
- 项目：苏找房WEB（路径 D:/repository/苏找房WEB/public/assets/js/house_data.js）
- 总条数：73，`id` 连续 `1` 到 `73`，无断档
- 修复原先 `49 -> 51` 的跳号缺口
- 来源会话：0bddbff5-d91b-45c4-99d9-ac1a45133ee6；代码基线：none

## 后续建议
- 若后续继续删改数据，可加一键自动重排 `id` 的小脚本

## 验证与归属
- 验证证据：extracted source=cursor project=苏找房WEB
- 涉及文件：`public/assets/js/house_data.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_data_id_reseq",
  "source_extraction_id": "3cd25028624245859343c4f25ebf133a",
  "version": 1,
  "memory_type": "entities"
}
-->