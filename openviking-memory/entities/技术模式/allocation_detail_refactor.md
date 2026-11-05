# allocation/detail.vue 新版框架改造
产品2.0 的 zhi2-web-admin 中 allocation/detail.vue 按新版框架完成改造。

## 顶部操作区
- 移除 operation-container 和 zs-attachment
- 改用 operation-btn-group，配置 moduleName:'prefund'、businessName:'adjustNotice'、primaryKey:'adjustNoticeId'、:custom-print="true"
- 撤销按钮改为 zs-button :permission="[`${permsPrefix}:revoke`]"，zs-print 放入 slot

## 表单结构
- 外层用 zs-form 包裹
- 四个 Headline 在 view 模式分别使用 DetailTemplate + contentInfo/contentInfo2/3/4
- edit/add 模式保留原有全部 el-form-item 字段

## 业务逻辑
- getDetail/submitForm/revoke/各类弹窗/银行划拨记录子表等逻辑均保留
- 可在页面切换 view/edit/add 模式

## 验证与归属
- 涉及文件：allocation/detail.vue、version/detail.vue、unblock/usemoney/detail.vue
- 所属项目：产品2.0；来源会话：80f0da60-1767-4d5d-82a5-1eb17414467f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allocation_detail_refactor",
  "source_extraction_id": "6bef3604790f499d8c2e13c541cc8a34",
  "version": 1,
  "memory_type": "entities"
}
-->