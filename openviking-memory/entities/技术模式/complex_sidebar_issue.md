# 物管页用complex侧栏异常涉layout组件
园区物管2.0 物业管理区域页面统一使用 complex 模块命名，侧边栏收起后仍显示细条问题涉及 layout 相关组件。

## 背景
- 代码库主工程为 zhi2-web-admin，物业管理区域相关页面统一使用 complex 模块命名
- 未检索到 EaArea 字面量

## 问题定位
- 侧边栏收起后仍显示细条的问题涉及 src/layout/index.vue、Sidebar/index.vue、RecursiveMenu.vue、Hamburger.vue 及 store 模块

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/layout/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/layout/components/Sidebar/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/layout/components/AppMain.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/settings.js
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/complex/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/complexChange/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/complexBuildingAuth/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue

## 验证与归属
- 来源会话：7cb81d4c-7323-41b8-ba59-bb27cc4083ad
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_sidebar_issue",
  "source_extraction_id": "b3308256c9da4e959219e2ced6ad87dd",
  "version": 1,
  "memory_type": "entities"
}
-->