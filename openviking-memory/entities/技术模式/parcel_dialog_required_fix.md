# 宗地信息弹窗取消必填校验修复
苏州市房地产监测V3 的新增/编辑宗地信息弹窗 ParcelDialog.vue 取消字段必填校验与 GIS 绘制校验，已可空值保存。

## 修改内容
- rules() 改为返回空对象，地块编号、不动权证号、土地用途、面积、出让价格/日期、宗地坐落、四至范围等不再显示红星也不拦截提交
- 去掉提交前「请绘制地图后再保存」的 gis 校验，地图 iframe 被拦截时仍可点确定保存（gis 可为空，需后端允许）

## 备注
- 若仅希望绘制非必填、其余字段仍必填，可只去 GIS 校验并恢复其它字段规则

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：projectManagement/customerProject/components/ParcelDialog.vue、ProjectCertificateTabs.vue、ParcelTable.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：260e58d6-3f0e-4efb-b6ab-5ed116832ca3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_dialog_required_fix",
  "source_extraction_id": "66ee6a2008f240c5a4f96b7c3e61c2fa",
  "version": 1,
  "memory_type": "entities"
}
-->