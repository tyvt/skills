# 新增证书弹窗主子表接口调用修复
苏州市房地产监测V3 中项目备案证书新增弹窗改为始终调用主子表接口，避免无楼幢时打到旧单表接口导致空白。
## 问题根因
- 原 `addRequest` 仅当草稿楼幢列表 `length > 0` 才调主子表接口 `addConEngConsLicAndBuilding` / `addConEngPlanLicAndBuilding`
- 否则走旧单表接口 `/presale/consLic/add` 或 `conEngConsLic/add`，建设工程规划许可证无楼幢或草稿未同步时命中旧接口致弹窗空白
## 修改内容
- `ProjectConsLicPanel` / `ProjectPlanLicPanel` 新增时始终调用主子表接口，楼幢从 `draft*` 或子表 `ref.tableData` 读取（可空数组）
- `consLic/detail.vue`、`planLic/detail.vue` 菜单页同样始终走合并接口，与弹窗一致
- 施工许可证请求体示例：`conEngConsLic` + `consLicBuildList`；规划许可证对应 `conEngPlanLic` + `planLicBuilds`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- E2E 新增用例「新增建设工程规划许可证保存走主子表接口」，断言 POST 含 `/presale`
- 所属项目：苏州市房地产监测V3；来源会话ID：a685a691-d9cd-48fb-934f-e93a7a97176d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_cert_main_sub",
  "source_extraction_id": "ecb2c916fe7a444b9f3afc876a11bd7c",
  "version": 1,
  "memory_type": "entities"
}
-->