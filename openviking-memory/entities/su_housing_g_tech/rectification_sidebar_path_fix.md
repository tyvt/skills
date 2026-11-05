# 整改通知书侧边栏高亮修复
苏住房G项目修复了整改通知书详情路径变更后侧边栏无法关联列表菜单的问题。

## 问题原因
- 详情路径从 rectificationNotice/{id} 变成 rectificationNotice/detailA/{id}
- 侧边栏仍用原始URL做前缀匹配，无法关联到「整改通知书」列表菜单

## 修复方式
- 新增 utils/sidebarActivePath.js，将详情路径归并回列表路径（detailA/detail0/detail1/detail2 中间段去除）
- RecursiveMenu.vue 所有菜单高亮/展开判断改为使用归一化后的 activePath

## 匹配逻辑
- 优先按 meta.filePath 找到列表路由注册路径
- 兜底用正则去掉 detailA/detail0/detail1/detail2 中间段

## 验证与归属
- 所属项目：苏住房G；来源会话：1b309caa-a18a-44ca-875c-cf2bf43466a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "rectification_sidebar_path_fix",
  "source_extraction_id": "51d4b7a1bb0c40548955037bb74a267b",
  "version": 1,
  "memory_type": "entities"
}
-->