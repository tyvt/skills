# 经纪机构管理员等级展示逻辑
苏州市房地产监测V3 中经纪机构管理列表的「管理员等级」仅对经纪机构入口展示，并关联主/附属管理员业务规则。

## 展示条件
- 仅当 organType 为 agency（经纪机构）时展示「管理员等级」查询条件与表格列
- 开发企业入口显示「管理员类型」（字典 company_admin_type）

## 字段与文案
- 查询参数与列表字段均为 isMainAdmin
- 前端写死映射：1 → 主管理员，其他 → 附属管理员
- 实现位置：`zhi2-web-admin/src/views/company/companyAdmin/index.vue` 的 MAIN_ADMIN_OPTIONS、formatMainAdmin；详情页 `detail.vue` 的 adminLevelLabel

## 业务规则
- 主管理员不可注销、不可批量删除
- 仅「已注销」且「非主管理员」的行可被选中删除

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 涉及文件：`zhi2-web-admin/src/views/company/companyAdmin/index.vue`、`detail.vue`
- 来源会话ID：466a6de0-a727-416a-87be-ede55fb884b7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_admin_level",
  "source_extraction_id": "0f5bf290b820418491b3cd580b84c35a",
  "version": 1,
  "memory_type": "entities"
}
-->