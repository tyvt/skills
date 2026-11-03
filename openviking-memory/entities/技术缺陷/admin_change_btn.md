# companyAdmin变更按钮因权限校验失败隐藏
`companyAdmin/detail.vue` 的 `showChangeButton` 要求 `checkPermission` 通过权限标识 `company:companyAdminChange:change`；接口满足 `bizState:"2"` 及经纪机构时按钮不显示即前端权限校验未过。
## 问题根因
- `showChangeButton` 除状态与类型条件外，额外要求 `checkPermission` 通过权限标识 `company:companyAdminChange:change`
- 接口数据满足 `bizState:"2"` 及经纪机构时按钮仍不显示，说明前端权限标识校验未通过
## 解决方案
- 确保路由菜单配置该权限标识 `company:companyAdminChange:change` 或赋予角色该权限
## 验证与归属
- 验证证据：src=苏州市房地产监测V3/318.md
- 涉及文件：src/views/company/companyAdmin/detail.vue、src/utils/permission.js
- 所属项目：苏州市房地产监测V3；来源会话：01a1630b-15cb-70c5-a400-76420e9f34c7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "admin_change_btn",
  "source_extraction_id": "969c384fc80b418cbab762ab5162a5c9",
  "version": 1,
  "memory_type": "entities"
}
-->