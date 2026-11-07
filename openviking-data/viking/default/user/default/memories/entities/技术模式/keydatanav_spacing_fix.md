# 首页关键数据导航图标间距修复（苏住房G）
苏住房G 项目修复首页「关键数据导航」第二、第三块图标贴住分隔线或压到上一块明细区的问题。

## 问题原因
- 指标行在宽卡片里被拉开时，中间块（含右侧灰色明细）过宽，会和下一块起始内容挤在一起
- 分隔线仅 1px 且两侧无留白；块内用 `justify-content: center`，图标更容易贴边

## 修复内容
- 去掉独立 `kd__divider`，第二、第三块改 `kd__sec--split`：`border-left` + 左侧 40px 内边距
- `.kd` 增加 `justify-content: space-between` 与 `gap: 40px`，保证三块间固定间距
- 块内改为 `justify-content: flex-start`，图标从分区左侧起排

## 验证与归属
- 涉及文件：`home/v2/components/KeyDataNav.vue`
- 所属项目：苏住房G；来源会话：3c4b3800-e2f9-438a-a5f7-4b2f4ba81985
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "keydatanav_spacing_fix",
  "source_extraction_id": "7de707754b5c430297ab66535487c776",
  "version": 1,
  "memory_type": "entities"
}
-->