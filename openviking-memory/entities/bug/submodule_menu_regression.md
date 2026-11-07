# 子模块菜单导航回退问题
合并 zhi2-web-admin 子模块时选错旧提交，导致菜单导航功能回退。

## 问题背景
- 刘丽辉（zsllh@zhishusz.cn）在合并处理冲突时选错子模块版本，引发菜单导航回退
- 合并提交 47984b5（2026-09-07 14:35:14）：Merge remote-tracking branch 'yulin-target/develop/v2.6.2-yulin' into develop/v2.6.2-yulin，冲突文件为 zhi2-web-admin
- 冲突时本地 aaf95c0（含菜单导航新版），远端 a8203a6（含菜单导航新版，ty 于 9/4 正确更新），最终错误选择 19b67c4（旧版无菜单导航，仅存在于 develop/v2.6.1-yuanqu 分支）

## 修复方案
- 子模块需指向提交 a8203a6（含菜单导航修复），正确更新到 a8203a6 的是 ty 的提交

## 涉及文件
- 前端核心文件：d:/repository/榆林G/zhi2-web-admin/src/settings.js、src/layout/components/Sidebar/index.vue、src/layout/components/Sidebar/RecursiveMenu.vue
- 布局与状态文件：src/layout/components/Navbar.vue、src/layout/index.vue、src/layout/components/TagsView/index.vue、src/store/modules/permission.js

## 参考信息
- 验证来源：src=榆林G/001.md
- 来源会话：3e1bb84d-7826-444e-ba65-f297d674c06d

## 验证与归属
- 所属项目：榆林G
- 验证证据：extracted source=cursor project=榆林G


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "submodule_menu_regression",
  "source_extraction_id": "fffe5bdfa8af4c40a27e1c3777054623",
  "version": 2,
  "memory_type": "entities"
}
-->
