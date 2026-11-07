# 管理员等级与类型按机构类型展示并由isMainAdmin映射
经纪机构入口(organType为agency)展示「管理员等级」，开发企业展示「管理员类型」(company_admin_type)，均通过isMainAdmin字段映射。

## 展示规则
- 经纪机构(organType=agency)展示「管理员等级」
- 开发企业展示「管理员类型」(company_admin_type)

## 字段映射
- 统一使用 `isMainAdmin` 字段，`1` 映射主管理员
- 实现见 `companyAdmin/index.vue` 的 `MAIN_ADMIN_OPTIONS`、`formatMainAdmin`
- 详情见 `detail.vue` 的 `adminLevelLabel`

## 权限约束
- 主管理员不可注销或批量删除

## 验证与归属
- 验证证据：extracted source=cursor session=466a6de0-a727-416a-87be-ede55fb884b7
- 涉及文件：companyAdmin/index.vue、detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：466a6de0-a727-416a-87be-ede55fb884b7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_level_mapping",
  "source_extraction_id": "154e1f80c9644439946847ff8e8bf216",
  "version": 1,
  "memory_type": "entities"
}
-->