# 登录名称列字段映射修正
「登录名称」列原先绑定 `loginName`，而接口返回字段为 `userName`，导致列一直为空。
## 问题根因
- `columns` 中该列 `prop` 为 `loginName`，与接口实际返回字段 `userName` 不符，列显示空白。
## 解决方案
- 将 `columns` 中该列 `prop` 从 `loginName` 改为 `userName`，刷新后正常显示 `admin` 等登录名称。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：system/logininfor/index.vue
- 所属项目：产品2.0；来源会话：84875e01-4384-43b4-be86-efa80af55ef5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_column_fieldmap",
  "source_extraction_id": "2d4686a934d3454e8470a4b3531e3d9b",
  "version": 1,
  "memory_type": "entities"
}
-->