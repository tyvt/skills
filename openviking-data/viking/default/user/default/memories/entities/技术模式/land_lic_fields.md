# 建设用地规划许可证字段顺序调整
苏州市房地产监测V3 的「建设用地规划许可证」基本信息字段已按设计稿调整顺序，不动产权证号移至用地性质之后。

## 改动说明
- 将「不动产权证号」从第 4 位移到「用地性质」之后（第 7 位）
- 查看态（`contentInfo`）与编辑态模板均已同步
- 校验规则与选证号逻辑未改

## 当前字段顺序
- 许可证编号 → 项目名称 → 用地单位 → 用地位置 → 用地面积 → 用地性质 → 不动产权证号 → 发证机关 → 发证日期 → 建设规模 → 附图及附件名称 → 备注（变更页末尾仍为「变更原因」）

## 涉及文件
- `BaseLandLicForm.vue`（正证详情/新增/编辑）
- `changeDetail.vue`（变更详情）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：2ad09f88-3393-44cf-96b0-eda0601788c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_lic_fields",
  "source_extraction_id": "79f8ae00a108477b8779e22490c3122c",
  "version": 1,
  "memory_type": "entities"
}
-->