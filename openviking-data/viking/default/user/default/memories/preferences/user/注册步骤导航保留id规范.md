- 注册步骤回退导航应统一使用 `goStep(step)` 保留 `companyRegisterId` 并在路由变更时调用 `loadRegisterDetailIfNeeded()`，避免无参调用清空 ID 导致回显失败与下一步报 ID 缺失。
- `institutionRegister.js` 需新增 `getInstitutionRegisterDetail`（`noMessage/noReject`）以补拉详情。
- 验证证据：src=苏州市房地产监测V3/076.md；来源会话：9fe9ee18-7352-4a5c-bc63-a249f00380ff；代码基线：none。

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "注册步骤导航保留ID规范",
  "source_extraction_id": "52563a75f85f486e82400fb998e47654",
  "version": 1,
  "memory_type": "preferences"
}
-->
