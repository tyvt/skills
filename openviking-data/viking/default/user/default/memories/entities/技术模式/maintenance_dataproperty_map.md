# maintenance 模块接口路径迁移至 dataProperty
按对照表全局排查并替换 9 个接口路径从 maintenance 改为 dataProperty，已修复。

## 改动范围
- 直接写死字符串接口（如 '/maintenance/facility...'）改为 '/dataProperty/facility...'
- moduleName + businessName 拼接方式中，若 businessName 属于 9 个目标接口，moduleName 从 maintenance 改为 dataProperty
- 共修改 zhi2-web-admin/src 下 49 个文件，旧路径 maintenance/... 无残留
- 修正 3 处误改的 import '@/views/maintenance/...' 已恢复为 maintenance 页面路径

## 目标接口映射
- facility、facilityChange、facilityDefinition、facilityFieldDefinition、facilityFundAllot、facilityFundAllotRange、facilityF...（共9条）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src 下相关文件及 RangeTable.vue 等
- 所属项目：产品2.0；来源会话：2a1a3c5d-9f69-436a-93ed-f2b987edfc4a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "maintenance_dataproperty_map",
  "source_extraction_id": "3ea283b432954418bfe9e179e58be66d",
  "version": 1,
  "memory_type": "entities"
}
-->