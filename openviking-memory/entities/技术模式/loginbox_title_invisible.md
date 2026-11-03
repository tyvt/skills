# 登录框标题未设色致深色模式白底白字隐形
太仓一网通办H5 中 loginBox.vue 的 .title-class 未指定颜色，深色模式白底白字导致标题不可见。

## 问题根因
- loginBox.vue 的 .title-class 未指定颜色
- 深色模式 style.css 中 :root 设白色文字，卡片白底致标题不可见

## 修复方案
- 在 loginBox.vue 为 .title-class 显式设置 color: #333 等样式
- 为入口补 title 与 content

## 验证与归属
- 验证证据：src=太仓一网通办H5/001.md
- 涉及文件：d:/repository/太仓一网通办H5/src/router/index.ts、d:/repository/太仓一网通办H5/src/views/decision/DecisionIndex.vue、d:/repository/太仓一网通办H5/src/api/common.ts、d:/repository/太仓一网通办H5/src/store/vote.js、d:/repository/太仓一网通办H5/昆山市民/src/api/modules/election.js、d:/repository/太仓一网通办H5/src/views/decision/ParticipateIn.vue、d:/repository/太仓一网通办H5/src/views/components/loginBox.vue
- 所属项目：太仓一网通办H5；来源会话：acdb01fd-de9f-4bac-91c4-db011808c9d1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "loginbox_title_invisible",
  "source_extraction_id": "257d5bae982e4b8e880e6453ec41e8c9",
  "version": 1,
  "memory_type": "entities"
}
-->