# 账单导入路由查询修复
T_SP_BILL 模块 property 业务 spF 修复了 getRouterPathByFilePath 找不到路由时直接抛错的问题，改为 getCurrentRouterByFilePath 并支持内嵌打开。

## 问题根因
- getRouterPathByFilePath 在后台菜单找不到 property/spFeeBill/service/import 对应路由时抛错「没有找到路由」
- 当前环境只配了列表菜单，未配导入子菜单

## 修复方案
- 改用 getCurrentRouterByFilePath 查询路由，不再抛异常
- 有导入菜单 → 正常跳转到导入页
- 没有导入菜单 → 在列表页内嵌打开导入组件（embedded 模式）

## 隐藏子菜单配置
- 若需独立页面，可在后台为各账单类型增加隐藏子菜单
- 字段示例：component=property/spFeeBill/service/import，path=import/:tableid，是否隐藏=是

## 关联信息
- 涉及文件：src/views/article/components/index.vue、src/views/article/richTextOne/index.vue、src/views/property/bill/components/index.vue
- 所属项目：产品2.0；来源会话：69de9222-9bbc-454a-9a3b-a2baa4720a55

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_bill_import_route_fix",
  "source_extraction_id": "6b8fdd3bf7ad451a97f037f40baed9eb",
  "version": 1,
  "memory_type": "entities"
}
-->