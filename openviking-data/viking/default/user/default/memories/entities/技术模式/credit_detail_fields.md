# 考评部门明细页字段新增（苏住房G）
苏住房G 项目 zhi2-web-admin 的 credit/assessment/detail.vue 已新增「简称」与「报告评分比例」两个字段并补充校验。

## 新增字段
- `shortName`（简称）：`zs-input`，必填
- `scoringRatio`（报告评分比例）：`zs-input-number`，默认 `1`，最小 `0`，步长 `0.1`，保留两位小数，必填

## 表单与校验
- `form` 新增 `shortName: undefined`、`scoringRatio: 1`，并补 `bizState: undefined` 规避类型问题
- `rules` 新增 `shortName` 必填、`scoringRatio` 必填 + 数值类型校验

## 遗留问题
- 剩余 3 个 TS 插件报错为 `this.getDicts(...)` 调用类型推断问题（历史问题，与本次字段改动无关）

## 涉及文件与归属
- 涉及文件：src/views/credit/assessment/detail.vue
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话ID：4eff440f-9e78-4e0a-9166-d02c722a1458

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credit_detail_fields",
  "source_extraction_id": "a384d5a4404b42f0bbdba932aae859ab",
  "version": 1,
  "memory_type": "entities"
}
-->
