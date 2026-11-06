# 从业人员信息身份证校验红字为预期行为
苏州市房地产监测V3 经纪机构管理→从业人员信息（`AgencyPersonnelDetail.vue`）红字「请输入正确的18位身份证号」是预期校验，不是前端 bug。

## 校验逻辑
- 使用 `@/utils/idCard.js` 的 `isValidIdNumber` 校验
- 除 18 位格式外，按国标 GB 11643 计算第 18 位校验码

## 示例说明
- 输入 `320504197805121234`：前 17 位 `32050419780512123` 对应校验位应为 `X`，非 `4`，故整串不通过

## 验证与归属
- 涉及文件：`AgencyPersonnelDetail.vue`、`@/utils/idCard.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：911f3164-2978-4d09-81ed-b2633e226cbf；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_id_check",
  "source_extraction_id": "8b8445b83fa44410a50f1a1c49887871",
  "version": 1,
  "memory_type": "entities"
}
-->