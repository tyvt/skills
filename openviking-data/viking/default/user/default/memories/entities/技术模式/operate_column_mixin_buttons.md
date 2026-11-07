# 操作列按钮复用 mixin 三件套
产品2.0 列表/详情子表操作列须复用 mixin 的 viewButton/editButton/deleteButton，zs-operate-column 需带 moduleName/businessName 才能拼对权限码。

## 问题现象
- 列表/详情子表操作列按钮样式不统一（查看 primary、编辑 plain、删除 danger plain），disabled/权限逻辑与全站不一致
- 页面重写 buttons() 用手写配置替代 mixin 现成按钮，丢掉了统一样式档位与禁用逻辑
- zs-operate-column 权限校验依赖 moduleName/businessName，页面漏传导致权限判定失效

## 解决方案
- 操作列 buttons() 里保留业务自定义按钮（如注销），再追加 this.viewButton、this.editButton、this.deleteButton，不要手写三件套
- 子表（如 certificatesTable.vue）使用 mixin 按钮时还要补传 moduleName 与 businessName 给 zs-operate-column

## 验证与来源
- 验证：staffManagement/components/index.vue 改回 [业务按钮, this.viewButton, this.editButton, this.deleteButton] 后按钮样式统一
- 涉及文件：zhi2-web-admin/src/views/company/staffManagement/components/index.vue、zhi2-web-admin/src/mixins/table.js
- 所属项目：产品2.0；来源会话：fdcfaacc-7f87-437f-8701-5f61b9154edb；代码基线：62d5fb9

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_mixin_buttons",
  "source_extraction_id": "539ec7c1bcb244a59f86e9efe4783557",
  "version": 1,
  "memory_type": "entities"
}
-->
