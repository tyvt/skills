# 从业人员列表操作列按钮样式缺失修复
产品2.0 的 staffManagement 模块因重写 buttons() 导致操作列按钮缺少统一样式与 disabled 逻辑，已修复为使用 mixin 配置。
## 问题根因
- staffManagement/components/index.vue 重写了 buttons()，用手写配置替代 mixin 的 viewButton、editButton、deleteButton
- 导致操作列按钮缺少统一样式（查看 primary、编辑 plain、删除 danger plain）及 disabled 等逻辑
## 修复内容
- index.vue 操作列改为使用 mixin 配置：保留业务自定义按钮（如“注销”），并加入 this.viewButton、this.editButton、this.deleteButton
- certificatesTable.vue 同步改为 mixin 按钮，补充 moduleName、businessName 传给 zs-operate-column 使权限校验正常
## 验证与归属
- 刷新页面后操作列按钮显示统一样式：查看（蓝色）、编辑（描边）、删除（红色描边）
- 所属项目：产品2.0；来源会话：fdcfaacc-7f87-437f-8701-5f61b9154edb；代码基线：none
- 涉及文件：staffManagement/components/index.vue、certificatesTable.vue、mixins/table.js、mixins/subTableMixins.js

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "staff_management_buttons",
  "source_extraction_id": "e626ff8127fa48a1baaecc584e194dd4",
  "version": 1,
  "memory_type": "entities"
}
-->