# 从业人员资格证书等级回显修复
苏州市房地产监测V3 项目修复从业人员资格证书「证书等级」回显异常问题。

## 修改内容
- `AgencyPersonnelCertificateTable.vue` 列表列：`certificateLevel` 改为 `level`，并增加 `type="dict"`、`dict-url="company_certificate_level"`
- 查看弹窗：证书等级改为 `type: 'dict'`，使用 `item.level` 和 `levelOptions`
- 编辑表单：`zs-input` 改为 `zs-select`，绑定 `level` 字段
- `created()` 中调用 `getDicts('company_certificate_level')` 加载字典
- `AgencyPersonnelDetail.vue` 的 `loadDetail()` 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 涉及文件：AgencyPersonnelCertificateTable.vue、AgencyPersonnelDetail.vue
- 来源会话：fee19692-41de-42b8-a8ed-8e08fa99ede8

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "cert_level_echo_fix",
  "source_extraction_id": "9e1ffa47190141f69bafb695413c998f",
  "version": 1,
  "memory_type": "entities"
}
-->