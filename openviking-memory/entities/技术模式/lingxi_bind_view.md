# 灵锡绑定查看功能页
惠山二期G 项目中新增的「灵锡绑定查看」页面，用于统计物业管理区域的业主绑定与投票情况。

## 功能说明
- 搜索条件：物业管理区域（complexName）、地址（address）、所属街道（subdistrictCode）、所属社区（communityCode）
- 表格列：物业管理区域、所属街道、所属社区、地址、总房屋数、投票业主数、已绑业主数、投票率、绑定率、总面积、已绑定面积、面积绑定率
- 底部汇总调用 /property/userStatistics/summary，展示房屋总数、已绑业主数、房屋绑定率
- 列表接口：GET /property/userStatistics/list（apiSuffix: 'list'）

## 菜单配置
- 后端动态下发菜单，需在菜单管理新增：组件路径 property/userStatistics/index、菜单名称 灵锡绑定查看、权限标识 property:userStatistics:list

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 涉及文件：property/userStatistics/index.vue、router/index.js、mixins/listMixins.js
- 所属项目：惠山二期G；来源会话：6db21291-c1ac-4c3b-921b-5f99e82885a2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lingxi_bind_view",
  "source_extraction_id": "8280b5a305984951910eb7df99f705d7",
  "version": 1,
  "memory_type": "entities"
}
-->