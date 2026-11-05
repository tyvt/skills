# AddDialog onClose 方法缺失修复
产品2.0 的 AddDialog.vue 因调用未定义的 onClose 触发 Vue 警告，已按项目其他弹窗写法补全。

## 问题根因
- 模板使用 `@close="onClose"`，但 dialogMixins 仅提供 `close()`，无 `onClose`
- 导致关闭弹窗时 Vue warn: Property or method "onClose" not defined

## 修复方式
- 在 AddDialog.vue 中补上 `onClose() { this.close() }`
- 关闭时重置表单并同步 `visible` 状态，警告消失
- 参考 depositNotice 的 AddDialog 写法

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/article/components/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/article/richTextOne/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/guaranteeDepositAccount/index.vue

## 验证与归属
- 所属项目：产品2.0；来源会话：0462a732-b177-45a1-9056-c252739c0ac9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_onclose_fix",
  "source_extraction_id": "3689ba371e1f48ea9ea4cc5ea35e0fbf",
  "version": 1,
  "memory_type": "entities"
}
-->