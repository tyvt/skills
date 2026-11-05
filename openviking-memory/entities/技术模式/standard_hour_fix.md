# 添加巡检记录标准工时格式校验修复
泰兴小程序员工端「添加巡检记录」标准工时（standardHour）输入非法格式被保存为 NaN 的问题已修复。

## 问题根因
- 标准工时直接用 `Number()` 转换，像 `0.0.5` 这类非法格式会得到 `NaN` 并被保存。

## 修复内容
- `add.vue` 保存前新增 `parseStandardHour`，只允许 `数字` 或 `数字.数字`（如 `0.5`、`1.25`）；输入 `0.0.5` 等非法格式时提示「标准工时格式不正确」并阻止保存；步骤列表、提交接口统一走解析函数。
- `detail.vue` 展示兜底：历史脏数据（后端返回 `NaN`）统一显示为 `-`，不再展示 `NaN`；再次编辑时已存非法值不会回填为 `NaN`。

## 预期行为
- 输入 `0.0.5` → 提示格式错误不保存；输入 `0.5` → 正常保存并显示 `0.5h`；留空 → 视为未填写允许保存。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue、src/staff/pages_facility/record/detail.vue
- 来源会话ID：407faa95-0a72-4db7-b335-97797a083932
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "standard_hour_fix",
  "source_extraction_id": "3d362587f08e485c87f954d90cef0281",
  "version": 1,
  "memory_type": "entities"
}
-->